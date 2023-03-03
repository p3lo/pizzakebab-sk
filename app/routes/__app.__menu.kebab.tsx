import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import React from 'react';
import KebabItem from '~/components/KebabItem';
import type { Kebab } from '~/types/types';
import { db } from '~/utils/db.server';

export async function loader() {
  const kebab = await db.kebab.findMany({
    include: {
      sizeSmall: true,
      sizeLarge: true,
    },
  });

  return json({ kebab });
}

function KebabMenu() {
  const [kebabSize, setKebabSize] = React.useState<'klasik' | 'XXL'>('klasik');
  const { kebab } = useLoaderData() as { kebab: Kebab[] };

  return (
    <div className="flex flex-col justify-center w-full space-y-10">
      <h1 className="flex justify-center font-bold text-2xl text-white">Kebab</h1>
      <div className="w-full rounded-2xl bg-base-content shadow-lg shadow-neutral-content/25">
        <div className="m-5">
          <div className="flex flex-col space-y-5">
            <div className="btn-group justify-center">
              <button
                className={`btn btn-sm ${kebabSize === 'klasik' && 'btn-active'}`}
                onClick={() => setKebabSize('klasik')}
              >
                Klasik
              </button>
              <button
                className={`btn btn-sm ${kebabSize === 'XXL' && 'btn-active'}`}
                onClick={() => setKebabSize('XXL')}
              >
                XXL
              </button>
            </div>
            {kebab?.map((kebabItem, index: number) => (
              <div key={kebabItem.id} className="flex flex-col space-y-2">
                <KebabItem
                  kebab={kebabItem}
                  kebabIndex={index + 1}
                  kebabSize={kebabSize === 'klasik' ? 'sizeSmall' : 'sizeLarge'}
                />
              </div>
            ))}
            <p className="text-base-100/70 text-xs">* Obal + balné v hodnote 0.40 €</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default KebabMenu;
