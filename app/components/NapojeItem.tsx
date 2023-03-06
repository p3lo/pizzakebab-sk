import { useFetcher } from '@remix-run/react';
import React from 'react';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import type { Napoje } from '~/types/types';

function NapojeItem({ napoje, napojeIndex }: { napoje: Napoje; napojeIndex: number }) {
  const fetcher = useFetcher();
  function addToCart() {
    const napojeDb = {
      name: napoje.name,
      description: napoje.description,
      price: napoje.price || 0,
    };
    fetcher.submit(
      {
        napoje: JSON.stringify(napojeDb),
      },
      {
        method: 'post',
      }
    );
  }
  return (
    <div className="flex flex-row items-start justify-between space-x-3 sm:space-x-5">
      <div className="flex flex-col">
        <div className="basis-4/5 flex text-base-300 space-x-1 items-center">
          <h2 className="font-bold sm:text-lg">{napojeIndex}.</h2>
          <h2 className="font-bold sm:text-lg">{napoje.name}</h2>
        </div>
        <p className="text-base-100/70 text-xs sm:text-sm">{napoje.description}</p>
      </div>
      <div className="basis-1/5 flex space-x-3 items-center justify-end">
        <p className="text-base-100 whitespace-nowrap text-sm sm:text-md">{napoje.price.toFixed(2)} €</p>
        <label className="btn btn-circle btn-ghost text-base-100" onClick={addToCart}>
          <AiOutlineShoppingCart className="w-5 h-5 transition duration-300 ease-in-out hover:scale-125" />
        </label>
      </div>
    </div>
  );
}

export default NapojeItem;
