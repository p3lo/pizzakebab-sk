import type { ActionArgs, LoaderArgs, SerializeFrom } from '@remix-run/node';
import { json, redirect } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import React from 'react';
import ObjednavkaSummary from '~/components/ObjednavkaSummary';
import { db } from '~/utils/db.server';
import { getUserId } from '~/utils/session.server';
import { motion } from 'framer-motion';
import ObjednavkaKontaktInfo from '~/components/ObjednavkaKontaktInfo';

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
  const formData = await request.formData();
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
    console.log('🚀 ~ file: __app.__menu.objednavka.tsx:92 ~ action ~ pizzaId:', pizzaId);
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
    console.log('🚀 ~ file: __app.__menu.objednavka.tsx:137 ~ action ~ bagetaId:', bagetaId);
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
    await db.cart.delete({
      where: {
        userId: userId,
      },
    });
    console.log('🚀 ~ file: __app.__menu.objednavka.tsx:173 ~ action ~ formData:', formData);
  }
  return null;
}

export interface LoaderData extends SerializeFrom<typeof loader> {
  goToContactInfo: React.Dispatch<React.SetStateAction<boolean>>;
}

function Objednavka() {
  const { objednavka, totalPrice } = useLoaderData<typeof loader>();
  const [isSummaryOpen, setIsSummaryOpen] = React.useState<boolean>(true);
  return isSummaryOpen ? (
    <motion.div
      className="flex w-full"
      key="summary"
      exit={{ opacity: 0, scale: 0.5 }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <ObjednavkaSummary objednavka={objednavka} totalPrice={totalPrice} goToContactInfo={setIsSummaryOpen} />
    </motion.div>
  ) : (
    <motion.div
      className="flex w-full"
      key="contactInfo"
      exit={{ opacity: 0, scale: 0.5 }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <ObjednavkaKontaktInfo objednavka={objednavka} totalPrice={totalPrice} goToContactInfo={setIsSummaryOpen} />
    </motion.div>
  );
}

export default Objednavka;
