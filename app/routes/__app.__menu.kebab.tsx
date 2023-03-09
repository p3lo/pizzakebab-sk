import type { ActionArgs, V2_MetaFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import React from 'react';
import KebabItem from '~/components/KebabItem';
import type { Kebab } from '~/types/types';
import { db } from '~/utils/db.server';
import { getUserId } from '~/utils/session.server';
import { motion } from 'framer-motion';

export const meta: V2_MetaFunction = () => {
  return [
    {
      title: 'Menu s kebabom - Pizza & Kebab',
    },
    {
      name: 'description',
      content:
        'Prezrite si náš rozsiahly výber kebabov, ktoré ponúkame v našej pizzerii. Vyberte si z rôznych druhov kebabov s rôznymi prílohami a omáčkami.',
    },
  ];
};

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
  const userId = await getUserId(request);
  if (!userId) return null;
  const getKebab = body.get('kebab');
  let kebab = null;
  if (getKebab) {
    kebab = JSON.parse(getKebab.toString());
  }
  if (kebab) {
    await db.cart.upsert({
      where: {
        userId,
      },
      update: {
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
      create: {
        userId,
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
    });
  }
  return null;
}

function KebabMenu() {
  const [kebabSize, setKebabSize] = React.useState<'klasik' | 'XXL'>('klasik');
  const { kebab } = useLoaderData() as { kebab: Kebab[] };

  return (
    <motion.div
      key="bageta"
      exit={{ opacity: 0, scale: 0.5 }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col justify-center w-full space-y-10"
    >
      <h1 className="flex justify-center text-2xl font-bold text-base-content">Kebab</h1>
      <div className="w-full shadow-2xl rounded-2xl bg-base-content shadow-primary-content">
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
    </motion.div>
  );
}

export default KebabMenu;
