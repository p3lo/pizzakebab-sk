import type { ActionArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import React from 'react';
import BagetaItem from '~/components/BagetaItem';
import type { Bageta } from '~/types/types';
import { db } from '~/utils/db.server';
import { getUserId } from '~/utils/session.server';

export async function loader() {
  const bageta = await db.bageta.findMany({
    include: {
      sizeSmall: true,
      sizeLarge: true,
    },
  });

  return json({ bageta });
}

export async function action({ request }: ActionArgs) {
  const body = await request.formData();
  const userId = await getUserId(request);
  if (!userId) return null;
  const getBageta = body.get('bageta');
  let bageta = null;
  if (getBageta) {
    bageta = JSON.parse(getBageta.toString());
  }
  if (bageta) {
    await db.cart.upsert({
      where: {
        userId,
      },
      update: {
        bagetas: {
          create: {
            name: bageta.name,
            price: bageta.price,
            weight: bageta.weight,
            size: bageta.size,
            description: bageta.description,
          },
        },
      },
      create: {
        userId,
        bagetas: {
          create: {
            name: bageta.name,
            price: bageta.price,
            weight: bageta.weight,
            size: bageta.size,
            description: bageta.description,
          },
        },
      },
    });
  }
  return null;
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
