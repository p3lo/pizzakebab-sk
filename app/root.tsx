import type { LinksFunction, LoaderArgs, MetaFunction } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react';
import styles from './tailwind.css';
import { db } from './utils/db.server';
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

export default function App() {
  return (
    <html lang="en" data-theme="coffee">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
