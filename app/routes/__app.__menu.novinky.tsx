import type { ActionArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import React from 'react';
import NovinkyItem from '~/components/NovinkyItem';
import type { Novinky } from '~/types/types';
import { db } from '~/utils/db.server';
import { getUserId } from '~/utils/session.server';
import { motion } from 'framer-motion';

export async function loader() {
  const novinky = await db.other.findMany();

  return json({ novinky });
}

export async function action({ request }: ActionArgs) {
  const body = await request.formData();
  const userId = await getUserId(request);
  if (!userId) return null;
  const getNovinky = body.get('novinky');
  let novinky = null;
  if (getNovinky) {
    novinky = JSON.parse(getNovinky.toString());
  }

  if (novinky) {
    await db.cart.upsert({
      where: {
        userId,
      },
      update: {
        others: {
          create: {
            name: novinky.name,
            price: novinky.price,
            weight: novinky.weight,
            description: novinky.description,
          },
        },
      },
      create: {
        userId,
        others: {
          create: {
            name: novinky.name,
            price: novinky.price,
            weight: novinky.weight,
            description: novinky.description,
          },
        },
      },
    });
  }
  return null;
}

function MenuNovinky() {
  const { novinky } = useLoaderData() as { novinky: Novinky[] };
  return (
    <motion.div
      key="bageta"
      exit={{ opacity: 0, scale: 0.5 }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col justify-center w-full space-y-10"
    >
      <h1 className="flex justify-center text-2xl font-bold text-white">Novinky</h1>
      <div className="w-full shadow-lg rounded-2xl bg-base-content shadow-neutral-content/25">
        <div className="m-5">
          <div className="flex flex-col space-y-5">
            {novinky?.map((novinkyItem, index: number) => (
              <div key={novinkyItem.id} className="flex flex-col space-y-2">
                <NovinkyItem novinky={novinkyItem} novinkyIndex={index + 1} />
              </div>
            ))}
            <p className="text-xs text-base-100/70">* Obal + balné v hodnote 0.30 €</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default MenuNovinky;
