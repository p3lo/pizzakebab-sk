import type { LoaderArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import { Outlet, Link, NavLink, useLoaderData } from '@remix-run/react';
import { useSetAtom } from 'jotai';
import React from 'react';
import { AiFillPhone, AiOutlineShoppingCart } from 'react-icons/ai';
import { CiBurger, CiPizza } from 'react-icons/ci';
import { GiDonerKebab, GiSandwich, GiCarrot, GiGlassShot, GiHamburgerMenu } from 'react-icons/gi';
import { useMediaQuery } from 'react-responsive';
import Footer from '~/components/Footer';
import { Image } from '~/components/Image';
import { db } from '~/utils/db.server';
import { drawerAtom } from '~/utils/drawerAtom';
import { getUserId } from '~/utils/session.server';
import { motion } from 'framer-motion';

export async function loader({ request }: LoaderArgs) {
  const userId = await getUserId(request);
  if (!userId) return json({ totalPrice: 0, totalProducts: 0 });
  try {
    const cart = await db.cart.findUnique({
      where: {
        userId: userId,
      },
      include: {
        pizzas: {
          include: {
            prilohy: true,
          },
        },
        kebabs: true,
        bagetas: true,
        salats: true,
        drinks: true,
        others: true,
      },
    });
    let totalPrice = 0;
    let totalProducts = 0;

    cart?.pizzas?.forEach((pizza) => {
      const obal = pizza.size === '32cm' ? 0.4 : 1.2;
      totalPrice += pizza.price + obal;
      totalProducts += 1;
      pizza.prilohy.forEach((priloha) => {
        totalPrice += priloha.price;
      });
    });

    cart?.kebabs?.forEach((kebab) => {
      totalPrice += kebab.price + 0.4;
      totalProducts += 1;
    });

    cart?.bagetas?.forEach((bageta) => {
      totalPrice += bageta.price;
      totalProducts += 1;
    });

    cart?.salats?.forEach((salat) => {
      totalPrice += salat.price + 0.4;
      totalProducts += 1;
    });

    cart?.drinks?.forEach((drink) => {
      totalPrice += drink.price + 0.15;
      totalProducts += 1;
    });

    cart?.others?.forEach((other) => {
      totalPrice += other.price + 0.3;
      totalProducts += 1;
    });

    return json({ totalPrice, totalProducts });
  } catch (error) {
    console.error(error);
  }
  return json({ totalPrice: 0, totalProducts: 0 });
}

function AppLayout() {
  const { totalPrice, totalProducts } = useLoaderData<typeof loader>();
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const setDrawerType = useSetAtom(drawerAtom);
  return (
    <div className="w-full min-h-screen font-roboto">
      <div className="h-full flex flex-col justify-between">
        <div className="flex flex-col space-y-5">
          <div className="flex items-center justify-between pt-5 md:mx-10">
            <div className="md:basis-1/3 ">
              {isMobile ? (
                <motion.div
                  initial={{ opacity: 0, x: -200 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex  py-1 px-2 border w-[140px] rounded-full bg-white items-center justify-center space-x-3 drop-shadow-xl"
                >
                  <div className="btn btn-circle btn-ghost">
                    <a href="tel:+421944992552">
                      <AiFillPhone className="w-6 h-6 text-green-600" />
                    </a>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, x: -200 }}
                  animate={{ opacity: 1, x: 0 }}
                  className=" drop-shadow-xl flex flex-col p-3 border rounded-full bg-white w-[220px]"
                >
                  <p className="flex justify-center text-xs">Zavolajte alebo objednajte online</p>
                  <div className="flex items-center justify-center space-x-2">
                    <AiFillPhone className="inline-block text-black" />
                    <a href="tel:+421944992552" className="text-sm font-bold text-black">
                      +421 944 992 552
                    </a>
                  </div>
                </motion.div>
              )}
            </div>
            {isMobile ? (
              <label htmlFor="my-drawer" className="drawer-button btn btn-circle btn-ghost ">
                <GiHamburgerMenu
                  className="flex justify-center w-8 h-8 text-base"
                  onClick={() => setDrawerType('menu')}
                />
              </label>
            ) : (
              <NavLink to="/" end className="flex justify-center basis-1/3" prefetch="intent">
                <Image
                  src="logo_pizza_kebab.webp"
                  alt="Logo"
                  width={300}
                  height={150}
                  fit="outside"
                  className="hidden md:inline-block"
                />
              </NavLink>
            )}
            <div className="flex justify-end md:basis-1/3">
              {totalProducts === 0 ? (
                <motion.div
                  initial={{ opacity: 0, x: 200 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex  py-4 px-2 border w-[140px] rounded-full bg-white items-center justify-center space-x-3 drop-shadow-xl"
                >
                  <div className="indicator ">
                    <AiOutlineShoppingCart className="w-6 h-6 " />
                    <span className="badge badge-xs indicator-item">{totalProducts}</span>
                  </div>
                  <p className="text-sm font-bold text-black">{totalPrice.toFixed(2) || (0.0).toFixed(2)} €</p>
                </motion.div>
              ) : (
                <motion.div initial={{ opacity: 0, x: 200 }} animate={{ opacity: 1, x: 0 }}>
                  <Link
                    to="/objednavka"
                    className="flex  py-4 px-2 border w-[140px] rounded-full bg-white items-center justify-center space-x-3 drop-shadow-xl transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110"
                  >
                    <div className="indicator ">
                      <AiOutlineShoppingCart className="w-6 h-6 " />
                      <span className="badge badge-xs indicator-item">{totalProducts}</span>
                    </div>
                    <p className="text-sm font-bold text-black">{totalPrice.toFixed(2) || (0.0).toFixed(2)} €</p>
                  </Link>
                </motion.div>
              )}
            </div>
          </div>
          {!isMobile && (
            <div className="flex md:mx-10">
              <div className="shadow-2xl navbar bg-primary text-primary-content rounded-xl shadow-black">
                <div className="navbar-start"></div>
                <div className="navbar-center ">
                  <Link to="/novinky" prefetch="intent" className="text-xl font-light btn btn-ghost w-[120px]">
                    <div className="flex items-center space-x-1">
                      <CiBurger />
                      <p>Novinky</p>
                    </div>
                  </Link>
                  <Link to="/pizza" prefetch="intent" className="text-xl font-light btn btn-ghost w-[120px]">
                    <div className="flex items-center space-x-1">
                      <CiPizza />
                      <p>PIZZA</p>
                    </div>
                  </Link>
                  <Link to="/kebab" prefetch="intent" className="text-xl font-light btn btn-ghost w-[120px]">
                    <div className="flex items-center space-x-1">
                      <GiDonerKebab />
                      <p>KEBAB</p>
                    </div>
                  </Link>
                  <Link to="/bageta" prefetch="intent" className="text-xl font-light btn btn-ghost w-[120px]">
                    <div className="flex items-center space-x-1">
                      <GiSandwich />
                      <p>BAGETY</p>
                    </div>
                  </Link>
                  <Link to="/salaty" prefetch="intent" className="text-xl font-light btn btn-ghost w-[120px]">
                    <div className="flex items-center space-x-1">
                      <GiCarrot />
                      <p>ŠALÁTY</p>
                    </div>
                  </Link>
                  <Link to="/napoje" prefetch="intent" className="text-xl font-light btn btn-ghost w-[120px]">
                    <div className="flex items-center space-x-1">
                      <GiGlassShot />
                      <p>NÁPOJE</p>
                    </div>
                  </Link>
                </div>
                <div className="navbar-end"></div>
              </div>
            </div>
          )}
        </div>

        <Outlet />
      </div>
      <div className="md:mx-10">
        <Footer />
      </div>
    </div>
  );
}

export default AppLayout;
