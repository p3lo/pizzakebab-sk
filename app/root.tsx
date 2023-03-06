import type { ActionArgs, LinksFunction, LoaderArgs, MetaFunction } from '@remix-run/node';

import { redirect } from '@remix-run/node';
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react';
import { useAtomValue } from 'jotai';
import KebabDrawer from './components/KebabDrawer';
import PizzaDrawer from './components/PizzaDrawer';
import styles from './tailwind.css';
import { db } from './utils/db.server';
import { drawerAtom } from './utils/drawerAtom';
import { commitSession, getCreateUserSession, getUserId } from './utils/session.server';

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: styles }];

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'New Remix App',
  viewport: 'width=device-width,initial-scale=1',
});

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

  return null;
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
  return (
    <html lang="en" data-theme="coffee">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <div className="drawer drawer-end">
          <input id="my-drawer" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">
            <Outlet />
          </div>
          <div className="drawer-side">
            <label htmlFor="my-drawer" className="drawer-overlay"></label>
            <div className="p-4 w-[500px] bg-base-content text-base-300">
              {drawerType === 'pizza' && <PizzaDrawer />}
              {drawerType === 'kebab' && <KebabDrawer />}
            </div>
          </div>
        </div>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
