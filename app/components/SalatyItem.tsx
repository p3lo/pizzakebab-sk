import { useFetcher } from '@remix-run/react';
import React from 'react';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import type { Salaty } from '~/types/types';

function SalatyItem({ salaty, salatyIndex }: { salaty: Salaty; salatyIndex: number }) {
  const fetcher = useFetcher();
  function addToCart() {
    const salatyDb = {
      name: salaty.name,
      description: salaty.description,
      price: salaty.price || 0,
      type: 'salaty',
      weight: salaty.weight || 0,
    };
    fetcher.submit(
      {
        salaty: JSON.stringify(salatyDb),
      },
      {
        method: 'post',
      }
    );
  }
  return (
    <div className="flex flex-row items-start justify-between space-x-5">
      <div className="flex flex-col">
        <div className="basis-4/5 flex text-base-300 space-x-1 items-center">
          <h2 className="font-bold text-lg">{salatyIndex}.</h2>
          <h2 className="font-bold text-lg">{salaty.name}</h2>
          <p className="text-base-100/70 text-sm">( {salaty.weight}g )</p>
        </div>
        <p className="text-base-100/70 text-sm">{salaty.description}</p>
      </div>
      <div className="basis-1/5 flex space-x-3 items-center">
        <p className="text-base-100 w-[60px]">{salaty.price.toFixed(2)} €</p>
        <label className="btn btn-circle btn-ghost text-base-100" onClick={addToCart}>
          <AiOutlineShoppingCart className="w-5 h-5 transition duration-300 ease-in-out hover:scale-125" />
        </label>
      </div>
    </div>
  );
}

export default SalatyItem;
