import React from 'react';
import PizzaItem from '~/components/PizzaItem';
import type { LoaderArgs, V2_MetaFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import type { Pizza, Pizzaprilohy } from '~/types/types';
import { db } from '~/utils/db.server';
import { getUserId } from '~/utils/session.server';
import { useSetAtom } from 'jotai';
import { drawerPizzaPrilohyAtom, userIdAtom } from '~/utils/drawerAtom';
import { motion } from 'framer-motion';
import { useMediaQuery } from 'react-responsive';

export const meta: V2_MetaFunction = () => {
  return [
    {
      title: 'Menu s pizzami - Pizza & Kebab',
    },
    {
      name: 'description',
      content:
        'Prezrite si náš rozsiahly výber pizze, ktoré ponúkame v našej pizzerii Pizza & Kebab. Vyberte si z rôznych druhov ciest s rôznymi náplňami a prílohami.',
    },
  ];
};

export async function loader({ request }: LoaderArgs) {
  const userId = await getUserId(request);
  const pizza = await db.pizza.findMany({
    include: {
      size32cm: true,
      size50cm: true,
    },
  });

  const prilohy = await db.pizzaprilohy.findMany({
    include: {
      prilohy32cm: true,
      prilohy50cm: true,
    },
  });

  return json({ pizza, prilohy, userId });
}

function MenuPizza() {
  const [pizzaSize, setPizzaSize] = React.useState<'32cm' | '50cm'>('32cm');
  const { pizza, prilohy, userId } = useLoaderData() as { pizza: Pizza[]; prilohy: Pizzaprilohy[]; userId: string };

  const setUserId = useSetAtom(userIdAtom);
  const setPrilohy = useSetAtom(drawerPizzaPrilohyAtom);

  const isMobile = useMediaQuery({ maxWidth: 767 });
  let initial = {};
  let animate = {};
  if (!isMobile) {
    initial = {
      opacity: 0,
      scale: 0.5,
    };
    animate = {
      opacity: 1,
      scale: 1,
    };
  }

  React.useEffect(() => {
    const transformedPrilohy = prilohy
      .map(({ id, name, prilohy32cm, prilohy50cm }) => {
        const prilohy32cmData = {
          id,
          name,
          price: prilohy32cm?.price || 0,
          weight: prilohy32cm?.weight || 0,
          size: '32cm',
        };
        const prilohy50cmData = {
          id,
          name,
          price: prilohy50cm?.price || 0,
          weight: prilohy50cm?.weight || 0,
          size: '50cm',
        };

        return [prilohy32cmData, prilohy50cmData];
      })
      .flat();
    setUserId(userId || '');
    setPrilohy(transformedPrilohy);
  }, [userId, prilohy, setUserId, setPrilohy]);

  return (
    <motion.div
      key="bageta"
      exit={{ opacity: 0, scale: 0.5 }}
      initial={initial}
      animate={animate}
      className="flex flex-col justify-center w-full space-y-10"
    >
      <h1 className="flex justify-center text-2xl font-bold text-base-content">Pizza</h1>
      <div className="w-full shadow-2xl rounded-2xl bg-base-content shadow-primary-content">
        <div className="m-5">
          <div className="flex flex-col space-y-5">
            <div className="justify-center btn-group">
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
            <p className="text-xs text-base-100/70">
              * Krabica + balné v hodnote {pizzaSize === '32cm' ? '0.40' : '1.20'} €
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
export default MenuPizza;
