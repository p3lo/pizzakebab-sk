import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import React from 'react';
import BagetaItem from '~/components/BagetaItem';
import type { Bageta } from '~/types/types';
import { db } from '~/utils/db.server';

export async function loader() {
  const bageta = await db.bageta.findMany({
    include: {
      sizeSmall: true,
      sizeLarge: true,
    },
  });

  return json({ bageta });
}

function BagetaMenu() {
  const [bagetaSize, setBagetaSize] = React.useState<'mala' | 'velka'>('mala');
  const { bageta } = useLoaderData() as { bageta: Bageta[] };

  return (
    <div className="flex flex-col justify-center w-full space-y-10">
      <h1 className="flex justify-center font-bold text-2xl text-white">Bagety</h1>
      <div className="w-full rounded-2xl bg-base-content shadow-lg shadow-neutral-content/25">
        <div className="m-5">
          <div className="flex flex-col space-y-5">
            <div className="btn-group justify-center">
              <button
                className={`btn btn-sm ${bagetaSize === 'mala' && 'btn-active'}`}
                onClick={() => setBagetaSize('mala')}
              >
                Malá
              </button>
              <button
                className={`btn btn-sm ${bagetaSize === 'velka' && 'btn-active'}`}
                onClick={() => setBagetaSize('velka')}
              >
                Veľká
              </button>
            </div>
            {bageta?.map((bagetaItem, index: number) => (
              <div key={bagetaItem.id} className="flex flex-col space-y-2">
                <BagetaItem
                  bageta={bagetaItem}
                  bagetaIndex={index + 1}
                  bagetaSize={bagetaSize === 'mala' ? 'sizeSmall' : 'sizeLarge'}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BagetaMenu;
