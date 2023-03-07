import type { ActionArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import React from 'react';
import SalatyItem from '~/components/SalatyItem';
import type { Salaty } from '~/types/types';
import { db } from '~/utils/db.server';
import { getUserId } from '~/utils/session.server';
import { motion } from 'framer-motion';

export async function loader() {
  const salaty = await db.salat.findMany();

  return json({ salaty });
}

export async function action({ request }: ActionArgs) {
  const body = await request.formData();
  const userId = await getUserId(request);
  if (!userId) return null;
  const getSalaty = body.get('salaty');
  let salaty = null;
  if (getSalaty) {
    salaty = JSON.parse(getSalaty.toString());
  }

  if (salaty) {
    await db.cart.upsert({
      where: {
        userId,
      },
      update: {
        salats: {
          create: {
            name: salaty.name,
            price: salaty.price,
            weight: salaty.weight,
            description: salaty.description,
          },
        },
      },
      create: {
        userId,
        salats: {
          create: {
            name: salaty.name,
            price: salaty.price,
            weight: salaty.weight,
            description: salaty.description,
          },
        },
      },
    });
  }
  return null;
}

function MenuSalaty() {
  const { salaty } = useLoaderData() as { salaty: Salaty[] };
  return (
    <motion.div
      key="bageta"
      exit={{ opacity: 0, scale: 0.5 }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col justify-center w-full space-y-10"
    >
      <h1 className="flex justify-center text-2xl font-bold text-base-content">Šaláty</h1>
      <div className="w-full shadow-2xl rounded-2xl bg-base-content shadow-primary-content">
        <div className="m-5">
          <div className="flex flex-col space-y-5">
            {salaty?.map((salatyItem, index: number) => (
              <div key={salatyItem.id} className="flex flex-col space-y-2">
                <SalatyItem salaty={salatyItem} salatyIndex={index + 1} />
              </div>
            ))}
            <p className="text-xs text-base-100/70">* Obal + balné v hodnote 0.40 €</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default MenuSalaty;
