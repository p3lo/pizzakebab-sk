import type { ActionArgs, LoaderArgs, SerializeFrom } from '@remix-run/node';
import { json, redirect } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import React from 'react';
import ObjednavkaSummary from '~/components/ObjednavkaSummary';
import { db } from '~/utils/db.server';
import { getUserId } from '~/utils/session.server';
import { motion } from 'framer-motion';
import ObjednavkaKontaktInfo from '~/components/ObjednavkaKontaktInfo';
import email from '~/utils/email.server';
import emailServer from '~/utils/email.server';
import invariant from 'tiny-invariant';
import { makeEmail } from '~/utils/makeEmail';
import { useMediaQuery } from 'react-responsive';

export async function loader({ request }: LoaderArgs) {
  const userId = await getUserId(request);
  if (!userId) return redirect('/');
  const objednavka = await db.cart.findUnique({
    where: {
      userId: userId,
    },
    include: {
      pizzas: {
        include: {
          prilohy: true,
        },
      },
      kebabs: true,
      bagetas: true,
      salats: true,
      drinks: true,
      others: true,
    },
  });
  let totalPrice = 0;
  let totalProducts = 0;

  objednavka?.pizzas?.forEach((pizza) => {
    const obal = pizza.size === '32cm' ? 0.4 : 1.2;
    totalPrice += pizza.price + obal;
    totalProducts += 1;
    pizza.prilohy.forEach((priloha) => {
      totalPrice += priloha.price;
    });
  });

  objednavka?.kebabs?.forEach((kebab) => {
    totalPrice += kebab.price + 0.4;
    totalProducts += 1;
  });

  objednavka?.bagetas?.forEach((bageta) => {
    totalPrice += bageta.price;
    totalProducts += 1;
  });

  objednavka?.salats?.forEach((salat) => {
    totalPrice += salat.price + 0.4;
    totalProducts += 1;
  });

  objednavka?.drinks?.forEach((drink) => {
    totalPrice += drink.price + 0.15;
    totalProducts += 1;
  });

  objednavka?.others?.forEach((other) => {
    totalPrice += other.price + 0.3;
    totalProducts += 1;
  });
  if (totalProducts === 0) return redirect('/');
  return json({ objednavka, totalPrice });
}

export async function action({ request }: ActionArgs) {
  const userId = await getUserId(request);
  if (!userId) return redirect('/');
  const cloudflareSecret = process.env.CLOUDFLARE_SECRET;
  const endpoint = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
  const formData = await request.formData();
  const token = formData.get('cf-turnstile-response');

  if (token && cloudflareSecret) {
    const body = `secret=${encodeURIComponent(cloudflareSecret?.toString())}&response=${encodeURIComponent(
      token.toString()
    )}`;
    const res = await fetch(endpoint, {
      method: 'POST',
      body,
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
      },
    });
    const data = await res.json();
    if (data && !data.success) {
      return json({ error: true });
    }
  }
  if (formData.get('intent') === 'other') {
    const otherId = formData.get('otherId');
    if (otherId) {
      await db.cart.update({
        where: {
          userId: userId,
        },
        data: {
          others: {
            delete: {
              id: parseInt(otherId as string),
            },
          },
        },
      });
    }
  }
  if (formData.get('intent') === 'pizza') {
    const pizzaId = formData.get('pizzaId');
    if (pizzaId) {
      await db.cart.update({
        where: {
          userId: userId,
        },
        data: {
          pizzas: {
            delete: {
              id: parseInt(pizzaId as string),
            },
          },
        },
      });
    }
  }
  if (formData.get('intent') === 'priloha') {
    const prilohaId = formData.get('prilohaId');
    if (prilohaId) {
      await db.pizzaCartPriloha.delete({
        where: {
          id: parseInt(prilohaId as string),
        },
      });
    }
  }
  if (formData.get('intent') === 'kebab') {
    const kebabId = formData.get('kebabId');
    if (kebabId) {
      await db.cart.update({
        where: {
          userId: userId,
        },
        data: {
          kebabs: {
            delete: {
              id: parseInt(kebabId as string),
            },
          },
        },
      });
    }
  }
  if (formData.get('intent') === 'bageta') {
    const bagetaId = formData.get('bagetaId');
    if (bagetaId) {
      await db.cart.update({
        where: {
          userId: userId,
        },
        data: {
          bagetas: {
            delete: {
              id: parseInt(bagetaId as string),
            },
          },
        },
      });
    }
  }
  if (formData.get('intent') === 'salat') {
    const salatId = formData.get('salatId');
    if (salatId) {
      await db.cart.update({
        where: {
          userId: userId,
        },
        data: {
          salats: {
            delete: {
              id: parseInt(salatId as string),
            },
          },
        },
      });
    }
  }
  if (formData.get('intent') === 'drink') {
    const drinkId = formData.get('drinkId');
    if (drinkId) {
      await db.cart.update({
        where: {
          userId: userId,
        },
        data: {
          drinks: {
            delete: {
              id: parseInt(drinkId as string),
            },
          },
        },
      });
    }
  }
  if (formData.get('intent') === 'formular') {
    const objednavka = formData.get('objednavka');
    const meno = formData.get('meno');
    const priezvisko = formData.get('priezvisko');
    const address = formData.get('address');
    const mesto = formData.get('mesto');
    const email = formData.get('email');
    const phone = '+421' + formData.get('phone');
    const totalPrice = formData.get('totalPrice');
    const doprava = formData.get('doprava');
    if (objednavka) {
      const orderParsed = JSON.parse(objednavka as string);
      const newOrder = {
        ...orderParsed,
        pizzas: orderParsed.pizzas.map(
          ({ id, cartId, prilohy, ...rest }: { id: number; cartId: number; prilohy: any[] }) => {
            if (prilohy) {
              const newPrilohy = prilohy.map(({ id, cartId, ...prilohaRest }) => prilohaRest);
              return {
                ...rest,
                prilohy: newPrilohy,
              };
            } else {
              return rest;
            }
          }
        ),
        kebabs: orderParsed.kebabs.map(({ id, cartId, ...rest }: { id: number; cartId: number }) => rest),
        bagetas: orderParsed.bagetas.map(({ id, cartId, ...rest }: { id: number; cartId: number }) => rest),
        salats: orderParsed.salats.map(({ id, cartId, ...rest }: { id: number; cartId: number }) => rest),
        drinks: orderParsed.drinks.map(({ id, cartId, ...rest }: { id: number; cartId: number }) => rest),
        others: orderParsed.others.map(({ id, cartId, ...rest }: { id: number; cartId: number }) => rest),
      };

      await db.order.create({
        data: {
          userId: userId,
          pizzas: {
            create: newOrder.pizzas.map((pizza: any) => ({
              name: pizza.name,
              description: pizza.description,
              size: pizza.size,
              weight: pizza.weight,
              price: pizza.price,
              prilohy: {
                create: pizza.prilohy.map((priloha: any) => ({
                  name: priloha.name,
                  weight: priloha.weight,
                  price: priloha.price,
                })),
              },
            })),
          },
          kebabs: {
            create: newOrder.kebabs.map((kebab: any) => ({
              name: kebab.name,
              description: kebab.description,
              size: kebab.size,
              weight: kebab.weight,
              price: kebab.price,
            })),
          },
          bagetas: {
            create: newOrder.bagetas.map((bageta: any) => ({
              name: bageta.name,
              description: bageta.description,
              size: bageta.size,
              weight: bageta.weight,
              price: bageta.price,
            })),
          },
          salats: {
            create: newOrder.salats.map((salat: any) => ({
              name: salat.name,
              description: salat.description,
              size: salat.size,
              weight: salat.weight,
              price: salat.price,
            })),
          },
          drinks: {
            create: newOrder.drinks.map((drink: any) => ({
              name: drink.name,
              description: drink.description,
              size: drink.size,
              weight: drink.weight,
              price: drink.price,
            })),
          },
          others: {
            create: newOrder.others.map((other: any) => ({
              name: other.name,
              description: other.description,
              size: other.size,
              weight: other.weight,
              price: other.price,
            })),
          },
        },
      });
    }

    await db.user.update({
      where: {
        userId: userId,
      },
      data: {
        name: meno?.toString(),
        surname: priezvisko?.toString(),
        address: address?.toString(),
        city: mesto?.toString(),
        email: email?.toString(),
        phone: phone.toString(),
      },
    });
    invariant(email, 'Email is required');
    invariant(phone, 'Phone is required');
    invariant(address, 'Address is required');
    invariant(mesto, 'City is required');
    invariant(meno, 'Name is required');
    invariant(priezvisko, 'Surname is required');
    invariant(objednavka, 'Objednavka is required');
    invariant(totalPrice, 'Total price is required');
    invariant(doprava, 'Doprava is required');
    const orderParsed = JSON.parse(objednavka as string);
    const emailMessage = makeEmail(
      orderParsed,
      phone,
      address.toString(),
      mesto.toString(),
      priezvisko.toString(),
      meno.toString(),
      Number(totalPrice),
      Number(doprava)
    );
    emailServer.sendSmtpEmail.subject = 'Objednávka z Pizza & Kebab';
    emailServer.sendSmtpEmail.htmlContent = `${emailMessage}`;
    emailServer.sendSmtpEmail.sender = { name: 'Pizza & Kebab', email: 'mysiacik@mysiacik.com' };
    emailServer.sendSmtpEmail.to = [
      { email: email?.toString(), name: meno?.toString() + ' ' + priezvisko?.toString() },
    ];
    emailServer.sendSmtpEmail.cc = [{ email: 'mysiacik@mysiacik.com', name: 'Pizza & Kebab' }];
    emailServer.sendSmtpEmail.replyTo = { email: 'pizzakebabdvory@gmail.com', name: 'Pizza & Kebab' };

    emailServer.emailAPi.sendTransacEmail(emailServer.sendSmtpEmail).then(
      (data) => {},
      (err) => {}
    );
    await db.cart.delete({
      where: {
        userId: userId,
      },
    });

    return json({ error: false });
  }
  return null;
}
export interface LoaderData extends SerializeFrom<typeof loader> {
  goToContactInfo: React.Dispatch<React.SetStateAction<boolean>>;
}

function Objednavka() {
  const { objednavka, totalPrice } = useLoaderData<typeof loader>();
  const [isSummaryOpen, setIsSummaryOpen] = React.useState<boolean>(true);
  const isMobile = useMediaQuery({ maxWidth: 767 });
  let initial = {};
  let animate = {};
  if (!isMobile) {
    initial = {
      opacity: 0,
      scale: 0.5,
    };
    animate = {
      opacity: 1,
      scale: 1,
    };
  }
  return isSummaryOpen ? (
    <motion.div
      className="flex w-full"
      key="summary"
      exit={{ opacity: 0, scale: 0.5 }}
      initial={initial}
      animate={animate}
    >
      <ObjednavkaSummary objednavka={objednavka} totalPrice={totalPrice} goToContactInfo={setIsSummaryOpen} />
    </motion.div>
  ) : (
    <motion.div
      className="flex w-full"
      key="contactInfo"
      exit={{ opacity: 0, scale: 0.5 }}
      initial={initial}
      animate={animate}
    >
      <ObjednavkaKontaktInfo objednavka={objednavka} totalPrice={totalPrice} goToContactInfo={setIsSummaryOpen} />
    </motion.div>
  );
}

export default Objednavka;
