import type { ActionArgs, LoaderArgs } from '@remix-run/node';
import { json, redirect } from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';
import React from 'react';
import { BsTrash } from 'react-icons/bs';
import { db } from '~/utils/db.server';
import { getUserId } from '~/utils/session.server';

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
  return null;
}

function Objednavka() {
  const { objednavka, totalPrice } = useLoaderData<typeof loader>();
  return (
    <div className="flex flex-col justify-center w-full space-y-10">
      <h1 className="flex justify-center text-2xl font-bold text-white">Objednávka</h1>
      <div className="w-full shadow-lg rounded-2xl bg-base-content shadow-neutral-content/25">
        <div className="m-5">
          <div className="flex flex-col space-y-5 text-base-100">
            {objednavka?.others?.length! > 0 && (
              <div className="flex flex-col space-y-2">
                <p className="text-lg italic font-bold underline">Z ponuky noviniek:</p>
                <div className="flex flex-col space-y-2">
                  {objednavka?.others?.map((other) => (
                    <Form method="post" key={other.id} className="flex flex-col space-y-1">
                      <div className="flex items-start justify-between w-full">
                        <div className="flex flex-col">
                          <div className="flex items-center space-x-1">
                            <p className="font-semibold">{other.name}</p>
                            <p className="text-xs text-base-100/70">( {other.weight}g )</p>
                          </div>
                          <p className="text-xs text-base-100/70">{other.description}</p>
                        </div>
                        <div className="flex items-center space-x-3">
                          <p className="text-sm font-semibold whitespace-nowrap sm:text-md">
                            {other.price.toFixed(2)} €
                          </p>
                          <input type="hidden" name="otherId" value={other.id} />
                          <button type="submit" name="intent" value="other">
                            <BsTrash className="w-4 h-4 text-red-700 cursor-pointer" />
                          </button>
                        </div>
                      </div>
                      <div className="flex items-start justify-between w-full">
                        <p className="text-sm text-base-100/70">+ Krabica a balné</p>
                        <div className="flex items-center space-x-3">
                          <p className="text-sm font-semibold whitespace-nowrap sm:text-md">{(0.3).toFixed(2)} €</p>
                          <div className="w-4" />
                        </div>
                      </div>
                    </Form>
                  ))}
                </div>
              </div>
            )}
            {objednavka?.pizzas?.length! > 0 && (
              <div className="flex flex-col space-y-2">
                <p className="text-lg italic font-bold underline">Z ponuky pizze:</p>
                <div className="flex flex-col space-y-2">
                  {objednavka?.pizzas?.map((pizza) => (
                    <div key={pizza.id} className="flex flex-col space-y-1">
                      <Form method="post" className="flex items-start justify-between w-full">
                        <div className="flex flex-col">
                          <div className="flex items-center space-x-1">
                            <p className="font-semibold">{pizza.name}</p>
                            <p className="text-xs text-base-100/70">( {pizza.weight}g )</p>
                            <p className="text-xs text-base-100/70">( {pizza.size} )</p>
                          </div>
                          <p className="text-xs text-base-100/70">{pizza.description}</p>
                        </div>
                        <div className="flex items-center space-x-3">
                          <p className="text-sm font-semibold whitespace-nowrap sm:text-md">
                            {pizza.price.toFixed(2)} €
                          </p>
                          <input type="hidden" name="pizzaId" value={pizza.id} />
                          <button type="submit" name="intent" value="pizza">
                            <BsTrash className="w-4 h-4 text-red-700 cursor-pointer" />
                          </button>
                        </div>
                      </Form>
                      {pizza.prilohy?.length! > 0 &&
                        pizza.prilohy?.map((priloha) => (
                          <Form method="post" key={priloha.id} className="flex items-start justify-between w-full">
                            <div className="flex space-x-1">
                              <p className="text-sm text-base-100/70">+ {priloha.name}</p>
                              <p className="text-xs text-base-100/70">( {priloha.weight}g )</p>
                            </div>
                            <div className="flex items-center space-x-3">
                              <p className="text-sm font-semibold whitespace-nowrap sm:text-md">
                                {priloha.price.toFixed(2)} €
                              </p>
                              <input type="hidden" name="prilohaId" value={priloha.id} />
                              <button type="submit" name="intent" value="priloha">
                                <BsTrash className="w-4 h-4 text-red-700 cursor-pointer" />
                              </button>
                            </div>
                          </Form>
                        ))}
                      <div className="flex items-start justify-between w-full">
                        <p className="text-sm text-base-100/70">+ Krabica a balné</p>
                        <div className="flex items-center space-x-3">
                          <p className="text-sm font-semibold whitespace-nowrap sm:text-md">
                            {pizza.size === '32cm' ? (0.4).toFixed(2) : (1.2).toFixed(2)} €
                          </p>
                          <div className="w-4" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {objednavka?.kebabs?.length! > 0 && (
              <div className="flex flex-col space-y-2">
                <p className="text-lg italic font-bold underline">Z ponuky kebabu:</p>
                <div className="flex flex-col space-y-2">
                  {objednavka?.kebabs?.map((kebab) => (
                    <div key={kebab.id} className="flex flex-col space-y-1">
                      <Form method="post" className="flex items-start justify-between w-full">
                        <div className="flex flex-col">
                          <div className="flex items-center space-x-1">
                            <p className="font-semibold">{kebab.name}</p>
                            <p className="text-xs text-base-100/70">( {kebab.weight}g )</p>
                          </div>
                          <p className="text-xs text-base-100/70">{kebab.description}</p>
                        </div>
                        <div className="flex items-center space-x-3">
                          <p className="text-sm font-semibold whitespace-nowrap sm:text-md">
                            {kebab.price.toFixed(2)} €
                          </p>
                          <input type="hidden" name="kebabId" value={kebab.id} />
                          <button type="submit" name="intent" value="kebab">
                            <BsTrash className="w-4 h-4 text-red-700 cursor-pointer" />
                          </button>
                        </div>
                      </Form>
                      <div className="flex items-start justify-between w-full">
                        <p className="text-sm text-base-100/70">+ Krabica a balné</p>
                        <div className="flex items-center space-x-3">
                          <p className="text-sm font-semibold whitespace-nowrap sm:text-md">{(0.4).toFixed(2)} €</p>
                          <div className="w-4" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {objednavka?.bagetas?.length! > 0 && (
              <div className="flex flex-col space-y-2">
                <p className="text-lg italic font-bold underline">Z ponuky bagiet:</p>
                <div className="flex flex-col space-y-2">
                  {objednavka?.bagetas?.map((bageta) => (
                    <div key={bageta.id} className="flex flex-col space-y-1">
                      <Form method="post" className="flex items-start justify-between w-full">
                        <div className="flex flex-col">
                          <div className="flex items-center space-x-1">
                            <p className="font-semibold">{bageta.name}</p>
                            <p className="text-xs text-base-100/70">( {bageta.weight}g )</p>
                            <p className="text-xs text-base-100/70">( {bageta.size === 'mala' ? 'malá' : 'veľká'} )</p>
                          </div>
                          <p className="text-xs text-base-100/70">{bageta.description}</p>
                        </div>
                        <div className="flex items-center space-x-3">
                          <p className="text-sm font-semibold whitespace-nowrap sm:text-md">
                            {bageta.price.toFixed(2)} €
                          </p>
                          <input type="hidden" name="bagetaId" value={bageta.id} />
                          <button type="submit" name="intent" value="bageta">
                            <BsTrash className="w-4 h-4 text-red-700 cursor-pointer" />
                          </button>
                        </div>
                      </Form>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {objednavka?.salats?.length! > 0 && (
              <div className="flex flex-col space-y-2">
                <p className="text-lg italic font-bold underline">Z ponuky šalátov:</p>
                <div className="flex flex-col space-y-2">
                  {objednavka?.salats?.map((salat) => (
                    <div key={salat.id} className="flex flex-col space-y-1">
                      <Form method="post" className="flex items-start justify-between w-full">
                        <div className="flex flex-col">
                          <div className="flex items-center space-x-1">
                            <p className="font-semibold">{salat.name}</p>
                            <p className="text-xs text-base-100/70">( {salat.weight}g )</p>
                          </div>
                          <p className="text-xs text-base-100/70">{salat.description}</p>
                        </div>
                        <div className="flex items-center space-x-3">
                          <p className="text-sm font-semibold whitespace-nowrap sm:text-md">
                            {salat.price.toFixed(2)} €
                          </p>
                          <input type="hidden" name="salatId" value={salat.id} />
                          <button type="submit" name="intent" value="salat">
                            <BsTrash className="w-4 h-4 text-red-700 cursor-pointer" />
                          </button>
                        </div>
                      </Form>
                      <div className="flex items-start justify-between w-full">
                        <p className="text-sm text-base-100/70">+ Krabica a balné</p>
                        <div className="flex items-center space-x-3">
                          <p className="text-sm font-semibold whitespace-nowrap sm:text-md">{(0.4).toFixed(2)} €</p>
                          <div className="w-4" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {objednavka?.drinks?.length! > 0 && (
              <div className="flex flex-col space-y-2">
                <p className="text-lg italic font-bold underline">Z ponuky šalátov:</p>
                <div className="flex flex-col space-y-2">
                  {objednavka?.drinks?.map((drink) => (
                    <div key={drink.id} className="flex flex-col space-y-1">
                      <Form method="post" className="flex items-start justify-between w-full">
                        <div className="flex flex-col">
                          <div className="flex items-center space-x-1">
                            <p className="font-semibold">{drink.name}</p>
                          </div>
                          <p className="text-xs text-base-100/70">{drink.description}</p>
                        </div>
                        <div className="flex items-center space-x-3">
                          <p className="text-sm font-semibold whitespace-nowrap sm:text-md">
                            {drink.price.toFixed(2)} €
                          </p>
                          <input type="hidden" name="drinkId" value={drink.id} />
                          <button type="submit" name="intent" value="drink">
                            <BsTrash className="w-4 h-4 text-red-700 cursor-pointer" />
                          </button>
                        </div>
                      </Form>
                      <div className="flex items-start justify-between w-full">
                        <p className="text-sm text-base-100/70">+ Zálohovaná fľaša / plechovka</p>
                        <div className="flex items-center space-x-3">
                          <p className="text-sm font-semibold whitespace-nowrap sm:text-md">{(0.15).toFixed(2)} €</p>
                          <div className="w-4" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className="flex w-full border-b border-base-100" />
            <div className="flex items-start justify-between w-full">
              <p className="text-lg font-bold">Cena spolu:</p>
              <p className="text-lg font-bold">{totalPrice.toFixed(2)} €</p>
            </div>
            <div className="flex justify-center">
              <button className="btn btn-primary">Objednať</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Objednavka;
