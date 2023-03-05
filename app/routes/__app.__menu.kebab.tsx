import type { ActionArgs } from '@remix-run/node';
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
export async function action({ request }: ActionArgs) {
  const body = await request.formData();
  const userId = body.get('userId')?.toString() || '';
  const getKebab = body.get('kebab');
  let kebab = null;
  if (getKebab) {
    kebab = JSON.parse(getKebab.toString());
  }
  if (kebab) {
    await db.user.update({
      where: { userId: userId },
      data: {
        orders: {
          create: {
            kebabs: {
              create: {
                name: kebab.name,
                price: kebab.price,
                weight: kebab.weight,
                size: kebab.size,
                description: kebab.description,
              },
            },
          },
        },
      },
    });
  }
  return json({ kebab });
}

function KebabMenu() {
  const [kebabSize, setKebabSize] = React.useState<'klasik' | 'XXL'>('klasik');
  const { kebab } = useLoaderData() as { kebab: Kebab[] };

  return (
    <div className="flex flex-col justify-center w-full space-y-10">
      <h1 className="flex justify-center text-2xl font-bold text-white">Kebab</h1>
      <div className="w-full shadow-lg rounded-2xl bg-base-content shadow-neutral-content/25">
        <div className="m-5">
          <div className="flex flex-col space-y-5">
            <div className="justify-center btn-group">
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
            <p className="text-xs text-base-100/70">* Obal + balné v hodnote 0.40 €</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default KebabMenu;
