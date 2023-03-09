import { ActionArgs, json, LinksFunction, LoaderArgs, MetaFunction } from '@remix-run/node';
import React from 'react';
import { redirect, V2_MetaFunction } from '@remix-run/node';
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration, useLoaderData } from '@remix-run/react';
import { useAtomValue, useSetAtom } from 'jotai';
import { ClientOnly } from 'remix-utils';
import KebabDrawer from './components/KebabDrawer';
import MainMenuDrawer from './components/MainMenuDrawer';
import PizzaDrawer from './components/PizzaDrawer';
import { Toaster } from './components/ui/toaster';
import styles from './tailwind.css';
import { db } from './utils/db.server';
import { drawerAtom, userIdAtom } from './utils/drawerAtom';
import { commitSession, getCreateUserSession, getUserId } from './utils/session.server';

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: styles }];

export const meta: V2_MetaFunction = () => {
  return [
    {
      title: 'Online objednávka pizze a kebabu - Pizza & Kebab',
    },
    {
      name: 'description',
      content: 'Objednaj si svoju obľúbenú pizzu alebo kebab online a nechaj si ju doručiť až k dverám.',
    },
  ];
};

export async function loader({ request }: LoaderArgs) {
  const userId = await getUserId(request);

  if (!userId) {
    const session = await getCreateUserSession();
    await db.user.upsert({
      where: { userId: session.data.userId },
      update: {},
      create: { userId: session.data.userId },
    });
    return redirect('/', {
      headers: {
        'Set-Cookie': await commitSession(session),
      },
    });
  } else {
    await db.user.upsert({
      where: { userId: userId },
      update: {},
      create: { userId: userId },
    });
  }

  return json({ userId });
}

export async function action({ request }: ActionArgs) {
  const body = await request.formData();
  const userId = await getUserId(request);
  if (!userId) return null;

  const getPizza = body.get('pizza');
  let pizza = null;
  if (getPizza) {
    pizza = JSON.parse(getPizza.toString());
  }
  const getKebab = body.get('kebab');
  let kebab = null;
  if (getKebab) {
    kebab = JSON.parse(getKebab.toString());
  }
  if (pizza) {
    const prilohy = JSON.parse(body.get('prilohy')?.toString() || '[]');
    await db.cart.upsert({
      where: {
        userId,
      },
      update: {
        pizzas: {
          create: {
            name: pizza.name,
            price: pizza.price,
            size: pizza.size,
            weight: pizza.weight,
            description: pizza.description,
            prilohy: {
              create: prilohy,
            },
          },
        },
      },
      create: {
        userId,
        pizzas: {
          create: {
            name: pizza.name,
            price: pizza.price,
            size: pizza.size,
            weight: pizza.weight,
            description: pizza.description,
            prilohy: {
              create: prilohy,
            },
          },
        },
      },
    });
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

export default function App() {
  const drawerType = useAtomValue(drawerAtom);
  const { userId } = useLoaderData();
  const setUserId = useSetAtom(userIdAtom);
  React.useEffect(() => {
    setUserId(userId);
  }, [userId]);
  return (
    <html lang="en" data-theme="bumblebee">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="font-arial">
        <div className="drawer drawer-end">
          <input id="my-drawer" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">
            <Outlet />
          </div>
          <div className="drawer-side">
            <label htmlFor="my-drawer" className="drawer-overlay"></label>

            {drawerType === 'pizza' && <PizzaDrawer />}
            {drawerType === 'kebab' && <KebabDrawer />}
            {drawerType === 'menu' && <MainMenuDrawer />}
          </div>
        </div>
        <div data-theme="dark">
          <ClientOnly>{() => <Toaster />}</ClientOnly>
        </div>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
