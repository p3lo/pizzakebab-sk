import type { ActionArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import React from 'react';
import { useLoaderData } from 'react-router';
import NapojeItem from '~/components/NapojeItem';
import type { Napoje } from '~/types/types';
import { db } from '~/utils/db.server';
import { getUserId } from '~/utils/session.server';

export async function loader() {
  const napoje = await db.drink.findMany();

  return json({ napoje });
}

export async function action({ request }: ActionArgs) {
  const body = await request.formData();
  const userId = await getUserId(request);
  if (!userId) return null;
  const getNapoje = body.get('napoje');
  let napoje = null;
  if (getNapoje) {
    napoje = JSON.parse(getNapoje.toString());
  }

  if (napoje) {
    await db.cart.upsert({
      where: {
        userId,
      },
      update: {
        drinks: {
          create: {
            name: napoje.name,
            price: napoje.price,
            description: napoje.description,
          },
        },
      },
      create: {
        userId,
        drinks: {
          create: {
            name: napoje.name,
            price: napoje.price,
            description: napoje.description,
          },
        },
      },
    });
  }
  return null;
}

function MenuNapoje() {
  const { napoje } = useLoaderData() as { napoje: Napoje[] };
  const [alkoNapoje, setAlkoNapoje] = React.useState<Napoje[]>([]);
  const [nealkoNapoje, setNealkoNapoje] = React.useState<Napoje[]>([]);
  React.useEffect(() => {
    const alko = napoje.filter((item) => item.type === 'alko');
    const nealko = napoje.filter((item) => item.type === 'nealko');
    setAlkoNapoje(alko);
    setNealkoNapoje(nealko);
  }, [napoje]);
  return (
    <div className="flex flex-col justify-center w-full space-y-10">
      <h1 className="flex justify-center font-bold text-2xl text-white">Nápoje</h1>
      <div className="w-full rounded-2xl bg-base-content shadow-lg shadow-neutral-content/25">
        <div className="m-5">
          <div className="flex flex-col space-y-6">
            <p className="flex justify-center font-semibold italic text-base-100 text-lg">Nealkoholické nápoje</p>
            <div className="flex w-full border-b border-base-100" />
            <div className="flex flex-col space-y-4">
              {nealkoNapoje?.map((napojeItem, index: number) => (
                <div key={napojeItem.id} className="flex flex-col space-y-2">
                  <NapojeItem napoje={napojeItem} napojeIndex={index + 1} />
                </div>
              ))}
              <p className="text-xs text-base-100/70">* Záloha za fľašu / plechovku 0.15 €</p>
            </div>
            <p className="flex justify-center font-semibold italic text-base-100 text-lg">Alkoholické nápoje</p>
            <div className="flex w-full border-b border-base-100" />
            <div className="flex flex-col space-y-4">
              {alkoNapoje?.map((napojeItem, index: number) => (
                <div key={napojeItem.id} className="flex flex-col space-y-2">
                  <NapojeItem napoje={napojeItem} napojeIndex={index + 1} />
                </div>
              ))}
              <p className="text-xs text-base-100/70">* Záloha za fľašu / plechovku 0.15 €</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MenuNapoje;
