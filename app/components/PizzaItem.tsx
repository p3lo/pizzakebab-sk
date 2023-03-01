import React from 'react';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import type { Pizza } from '~/types/types';

function PizzaItem({ pizza, pizzaSize, pizzaIndex }: { pizza: Pizza; pizzaSize: '32cm' | '50cm'; pizzaIndex: number }) {
  return (
    <div className="flex flex-row items-start justify-between space-x-5">
      <div className="flex flex-col">
        <div className="basis-4/5 flex text-base-300 space-x-1 items-center">
          <h2 className="font-bold text-lg">{pizzaIndex}.</h2>
          <h2 className="font-bold text-lg">{pizza.name}</h2>
          <p className="text-base-100/70 text-sm">( {pizza[pizzaSize].weight}g )</p>
        </div>
        <p className="text-base-100/70 text-sm">{pizza.description}</p>
      </div>
      <div className="basis-1/5 flex space-x-3 items-center">
        <p className="text-base-100 w-[60px]">{pizza[pizzaSize].price} €</p>
        <div className="btn btn-circle btn-ghost text-base-100">
          <AiOutlineShoppingCart className="w-5 h-5 transition duration-300 ease-in-out hover:scale-125" />
        </div>
      </div>
    </div>
  );
}

export default PizzaItem;
