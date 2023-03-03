import React from 'react';
import PizzaItem from '~/components/PizzaItem';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import type { Pizza } from '~/types/types';
import { db } from '~/utils/db.server';

export async function loader() {
  const pizza = await db.pizza.findMany({
    include: {
      size32cm: true,
      size50cm: true,
    },
  });

  return json({ pizza });
}

function MenuPizza() {
  const [pizzaSize, setPizzaSize] = React.useState<'32cm' | '50cm'>('32cm');
  const { pizza } = useLoaderData() as { pizza: Pizza[] };
  return (
    <div className="flex flex-col justify-center w-full space-y-10">
      <h1 className="flex justify-center font-bold text-2xl text-white">Pizza</h1>
      <div className="w-full rounded-2xl bg-base-content shadow-lg shadow-neutral-content/25">
        <div className="m-5">
          <div className="flex flex-col space-y-5">
            <div className="btn-group justify-center">
              <button
                className={`btn btn-sm ${pizzaSize === '32cm' && 'btn-active'}`}
                onClick={() => setPizzaSize('32cm')}
              >
                Ø 32 cm
              </button>
              <button
                className={`btn btn-sm ${pizzaSize === '50cm' && 'btn-active'}`}
                onClick={() => setPizzaSize('50cm')}
              >
                Ø 50 cm
              </button>
            </div>
            {pizza?.map((pizzaItem, index: number) => (
              <div key={pizzaItem.id} className="flex flex-col space-y-2">
                <PizzaItem
                  pizza={pizzaItem}
                  pizzaIndex={index + 1}
                  pizzaSize={pizzaSize === '32cm' ? 'size32cm' : 'size50cm'}
                />
              </div>
            ))}
            <p className="text-base-100/70 text-xs">
              * Krabica + balné v hodnote {pizzaSize === '32cm' ? '0.40' : '1.20'} €
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default MenuPizza;
