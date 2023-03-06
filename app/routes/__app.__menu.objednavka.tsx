import type { LoaderArgs } from '@remix-run/node';
import { json, redirect } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
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
  return json({ objednavka });
}

function Objednavka() {
  const { objednavka } = useLoaderData<typeof loader>();
  return (
    <div className="flex flex-col justify-center w-full space-y-10">
      <h1 className="flex justify-center font-bold text-2xl text-white">Objednávka</h1>
      <div className="w-full rounded-2xl bg-base-content shadow-lg shadow-neutral-content/25">
        <div className="m-5">
          <div className="flex flex-col space-y-5 text-base-100">
            {objednavka?.others?.length! > 0 && (
              <div className="flex flex-col space-y-2">
                <p className="font-bold italic text-lg underline">Z ponuky noviniek:</p>
                <div className="flex flex-col space-y-2">
                  {objednavka?.others?.map((other) => (
                    <div key={other.id} className="flex flex-col space-y-1">
                      <div className="flex w-full justify-between items-start">
                        <div className="flex flex-col">
                          <div className="flex space-x-1 items-center">
                            <p className="font-semibold">{other.name}</p>
                            <p className="text-xs text-base-100/70">( {other.weight}g )</p>
                          </div>
                          <p className="text-xs text-base-100/70">{other.description}</p>
                        </div>
                        <div className="flex space-x-3 items-center">
                          <p className="font-semibold  whitespace-nowrap text-sm sm:text-md">
                            {other.price.toFixed(2)} €
                          </p>
                          <BsTrash className="w-4 h-4 cursor-pointer text-red-700" />
                        </div>
                      </div>
                      <div className="flex w-full justify-between items-start">
                        <p className="text-sm text-base-100/70">+ Krabica a balné</p>
                        <div className="flex space-x-3 items-center">
                          <p className="font-semibold whitespace-nowrap text-sm sm:text-md">{(0.3).toFixed(2)} €</p>
                          <div className="w-4" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {objednavka?.pizzas?.length! > 0 && (
              <div className="flex flex-col space-y-2">
                <p className="font-bold italic text-lg underline">Z ponuky pizze:</p>
                <div className="flex flex-col space-y-2">
                  {objednavka?.pizzas?.map((pizza) => (
                    <div key={pizza.id} className="flex flex-col space-y-1">
                      <div className="flex w-full justify-between items-start">
                        <div className="flex flex-col">
                          <div className="flex space-x-1 items-center">
                            <p className="font-semibold">{pizza.name}</p>
                            <p className="text-xs text-base-100/70">( {pizza.weight}g )</p>
                            <p className="text-xs text-base-100/70">( {pizza.size} )</p>
                          </div>
                          <p className="text-xs text-base-100/70">{pizza.description}</p>
                        </div>
                        <div className="flex space-x-3 items-center">
                          <p className="font-semibold  whitespace-nowrap text-sm sm:text-md">
                            {pizza.price.toFixed(2)} €
                          </p>
                          <BsTrash className="w-4 h-4 cursor-pointer text-red-700" />
                        </div>
                      </div>
                      {pizza.prilohy?.length! > 0 &&
                        pizza.prilohy?.map((priloha) => (
                          <div key={priloha.id} className="flex w-full justify-between items-start">
                            <div className="flex space-x-1">
                              <p className="text-sm text-base-100/70">+ {priloha.name}</p>
                              <p className="text-xs text-base-100/70">( {priloha.weight}g )</p>
                            </div>
                            <div className="flex space-x-3 items-center">
                              <p className="font-semibold  whitespace-nowrap text-sm sm:text-md">
                                {priloha.price.toFixed(2)} €
                              </p>
                              <BsTrash className="w-4 h-4 cursor-pointer text-red-700" />
                            </div>
                          </div>
                        ))}
                      <div className="flex w-full justify-between items-start">
                        <p className="text-sm text-base-100/70">+ Krabica a balné</p>
                        <div className="flex space-x-3 items-center">
                          <p className="font-semibold whitespace-nowrap text-sm sm:text-md">
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
                <p className="font-bold italic text-lg underline">Z ponuky kebabu:</p>
                <div className="flex flex-col space-y-2">
                  {objednavka?.kebabs?.map((kebab) => (
                    <div key={kebab.id} className="flex flex-col space-y-1">
                      <div className="flex w-full justify-between items-start">
                        <div className="flex flex-col">
                          <div className="flex space-x-1 items-center">
                            <p className="font-semibold">{kebab.name}</p>
                            <p className="text-xs text-base-100/70">( {kebab.weight}g )</p>
                          </div>
                          <p className="text-xs text-base-100/70">{kebab.description}</p>
                        </div>
                        <div className="flex space-x-3 items-center">
                          <p className="font-semibold  whitespace-nowrap text-sm sm:text-md">
                            {kebab.price.toFixed(2)} €
                          </p>
                          <BsTrash className="w-4 h-4 cursor-pointer text-red-700" />
                        </div>
                      </div>
                      <div className="flex w-full justify-between items-start">
                        <p className="text-sm text-base-100/70">+ Krabica a balné</p>
                        <div className="flex space-x-3 items-center">
                          <p className="font-semibold whitespace-nowrap text-sm sm:text-md">{(0.4).toFixed(2)} €</p>
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
                <p className="font-bold italic text-lg underline">Z ponuky bagiet:</p>
                <div className="flex flex-col space-y-2">
                  {objednavka?.bagetas?.map((bageta) => (
                    <div key={bageta.id} className="flex flex-col space-y-1">
                      <div className="flex w-full justify-between items-start">
                        <div className="flex flex-col">
                          <div className="flex space-x-1 items-center">
                            <p className="font-semibold">{bageta.name}</p>
                            <p className="text-xs text-base-100/70">( {bageta.weight}g )</p>
                            <p className="text-xs text-base-100/70">( {bageta.size === 'mala' ? 'malá' : 'veľká'} )</p>
                          </div>
                          <p className="text-xs text-base-100/70">{bageta.description}</p>
                        </div>
                        <div className="flex space-x-3 items-center">
                          <p className="font-semibold  whitespace-nowrap text-sm sm:text-md">
                            {bageta.price.toFixed(2)} €
                          </p>
                          <BsTrash className="w-4 h-4 cursor-pointer text-red-700" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {objednavka?.salats?.length! > 0 && (
              <div className="flex flex-col space-y-2">
                <p className="font-bold italic text-lg underline">Z ponuky šalátov:</p>
                <div className="flex flex-col space-y-2">
                  {objednavka?.salats?.map((salat) => (
                    <div key={salat.id} className="flex flex-col space-y-1">
                      <div className="flex w-full justify-between items-start">
                        <div className="flex flex-col">
                          <div className="flex space-x-1 items-center">
                            <p className="font-semibold">{salat.name}</p>
                            <p className="text-xs text-base-100/70">( {salat.weight}g )</p>
                          </div>
                          <p className="text-xs text-base-100/70">{salat.description}</p>
                        </div>
                        <div className="flex space-x-3 items-center">
                          <p className="font-semibold  whitespace-nowrap text-sm sm:text-md">
                            {salat.price.toFixed(2)} €
                          </p>
                          <BsTrash className="w-4 h-4 cursor-pointer text-red-700" />
                        </div>
                      </div>
                      <div className="flex w-full justify-between items-start">
                        <p className="text-sm text-base-100/70">+ Krabica a balné</p>
                        <div className="flex space-x-3 items-center">
                          <p className="font-semibold whitespace-nowrap text-sm sm:text-md">{(0.4).toFixed(2)} €</p>
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
                <p className="font-bold italic text-lg underline">Z ponuky šalátov:</p>
                <div className="flex flex-col space-y-2">
                  {objednavka?.drinks?.map((drink) => (
                    <div key={drink.id} className="flex flex-col space-y-1">
                      <div className="flex w-full justify-between items-start">
                        <div className="flex flex-col">
                          <div className="flex space-x-1 items-center">
                            <p className="font-semibold">{drink.name}</p>
                          </div>
                          <p className="text-xs text-base-100/70">{drink.description}</p>
                        </div>
                        <div className="flex space-x-3 items-center">
                          <p className="font-semibold  whitespace-nowrap text-sm sm:text-md">
                            {drink.price.toFixed(2)} €
                          </p>
                          <BsTrash className="w-4 h-4 cursor-pointer text-red-700" />
                        </div>
                      </div>
                      <div className="flex w-full justify-between items-start">
                        <p className="text-sm text-base-100/70">+ Zálohovaná fľaša / plechovka</p>
                        <div className="flex space-x-3 items-center">
                          <p className="font-semibold whitespace-nowrap text-sm sm:text-md">{(0.15).toFixed(2)} €</p>
                          <div className="w-4" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className="flex w-full border-b border-base-100" />
            <div className="flex w-full justify-between items-start">
              <p className="font-bold text-lg">Cena spolu:</p>
              <p className="font-bold text-lg">0.20 €</p>
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
