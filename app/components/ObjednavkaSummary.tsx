import { useFetcher } from '@remix-run/react';
import React from 'react';
import { BsTrash } from 'react-icons/bs';
import type { LoaderData } from '~/routes/__app.__menu.objednavka';

function ObjednavkaSummary({ objednavka, totalPrice }: LoaderData) {
  const fetcher = useFetcher();
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
                    <fetcher.Form method="post" key={other.id} className="flex flex-col space-y-1">
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
                    </fetcher.Form>
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
                      <fetcher.Form method="post" className="flex items-start justify-between w-full">
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
                      </fetcher.Form>
                      {pizza.prilohy?.length! > 0 &&
                        pizza.prilohy?.map((priloha) => (
                          <fetcher.Form
                            method="post"
                            key={priloha.id}
                            className="flex items-start justify-between w-full"
                          >
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
                          </fetcher.Form>
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
                      <fetcher.Form method="post" className="flex items-start justify-between w-full">
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
                      </fetcher.Form>
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
                      <fetcher.Form method="post" className="flex items-start justify-between w-full">
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
                      </fetcher.Form>
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
                      <fetcher.Form method="post" className="flex items-start justify-between w-full">
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
                      </fetcher.Form>
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
                      <fetcher.Form method="post" className="flex items-start justify-between w-full">
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
                      </fetcher.Form>
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

export default ObjednavkaSummary;
