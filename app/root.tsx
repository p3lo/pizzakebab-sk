import type { LinksFunction, MetaFunction } from '@remix-run/node';
import { Link, Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react';
import { Image } from './components/Image';
import styles from './tailwind.css';
import { AiFillPhone, AiOutlineShoppingCart } from 'react-icons/ai';
import { CiPizza } from 'react-icons/ci';
import { GiDonerKebab, GiSandwich, GiCarrot, GiGlassShot } from 'react-icons/gi';

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: styles }];

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'New Remix App',
  viewport: 'width=device-width,initial-scale=1',
});

export default function App() {
  return (
    <html lang="en" data-theme="coffee">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <div className="min-h-screen w-full  ">
          <div className="flex flex-col space-y-5">
            <div className="mx-10 flex items-center justify-between pt-5">
              <div className="flex flex-col p-3 border rounded-full bg-white">
                <p className="text-xs">Zavolajte alebo objednajte online</p>
                <div className="flex space-x-2 items-center justify-center">
                  <AiFillPhone className="inline-block text-black" />
                  <a href="tel:+421944992552" className="text-sm font-bold text-black">
                    +421 944 992 552
                  </a>
                </div>
              </div>
              <Image src="logo_pizza_kebab.webp" alt="Logo" width={300} height={150} fit="outside" />
              <div className="flex py-1 px-2 border rounded-full bg-white items-center space-x-3">
                <div className="btn btn-circle btn-ghost">
                  <div className="indicator ">
                    <AiOutlineShoppingCart className="w-6 h-6 " />
                    <span className="badge badge-xs indicator-item">0</span>
                  </div>
                </div>
                <p className="text-sm text-black">
                  Spolu: <span className="font-bold">0 $</span>
                </p>
              </div>
            </div>
            <div className="mx-10 flex">
              <div className="navbar bg-primary text-primary-content rounded-xl">
                <div className="navbar-start"></div>
                <div className="navbar-center ">
                  <Link to="/" className="text-xl font-light btn btn-ghost w-[120px]">
                    <div className="flex space-x-1 items-center">
                      <CiPizza />
                      <p>PIZZA</p>
                    </div>
                  </Link>
                  <Link to="/" className="text-xl font-light btn btn-ghost w-[120px]">
                    <div className="flex space-x-1 items-center">
                      <GiDonerKebab />
                      <p>KEBAB</p>
                    </div>
                  </Link>
                  <Link to="/" className="text-xl font-light btn btn-ghost w-[120px]">
                    <div className="flex space-x-1 items-center">
                      <GiSandwich />
                      <p>BAGETY</p>
                    </div>
                  </Link>
                  <Link to="/" className="text-xl font-light btn btn-ghost w-[120px]">
                    <div className="flex space-x-1 items-center">
                      <GiCarrot />
                      <p>ŠALÁTY</p>
                    </div>
                  </Link>
                  <Link to="/" className="text-xl font-light btn btn-ghost w-[120px]">
                    <div className="flex space-x-1 items-center">
                      <GiGlassShot />
                      <p>NÁPOJE</p>
                    </div>
                  </Link>
                </div>
                <div className="navbar-end"></div>
              </div>
            </div>
          </div>
          <Outlet />
        </div>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
