import type { LoaderArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import { Outlet, Link, NavLink, useLoaderData } from '@remix-run/react';
import React from 'react';
import { AiFillPhone, AiOutlineShoppingCart } from 'react-icons/ai';
import { CiBurger, CiPizza } from 'react-icons/ci';
import { GiDonerKebab, GiSandwich, GiCarrot, GiGlassShot, GiHamburger } from 'react-icons/gi';
import { Image } from '~/components/Image';
import { db } from '~/utils/db.server';
import { getUserId } from '~/utils/session.server';

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
  return (
    <div className="min-h-screen w-full  ">
      <div className="flex flex-col space-y-5">
        <div className="md:mx-10 flex items-center justify-between pt-5">
          <div className="basis-1/3 ">
            <div className="flex flex-col p-3 border rounded-full bg-white w-[220px]">
              <p className="text-xs flex justify-center">Zavolajte alebo objednajte online</p>
              <div className="flex space-x-2 items-center justify-center">
                <AiFillPhone className="inline-block text-black" />
                <a href="tel:+421944992552" className="text-sm font-bold text-black">
                  +421 944 992 552
                </a>
              </div>
            </div>
          </div>
          <NavLink to="/" end className="basis-1/3 flex justify-center" prefetch="intent">
            <Image
              src="logo_pizza_kebab.webp"
              alt="Logo"
              width={300}
              height={150}
              fit="outside"
              className="hidden md:inline-block"
            />
          </NavLink>
          <div className="basis-1/3 justify-end flex">
            <div className="flex  py-1 px-2 border w-[140px] rounded-full bg-white items-center justify-center space-x-3">
              <Link to="/objednavka" className="btn btn-circle btn-ghost">
                <div className="indicator ">
                  <AiOutlineShoppingCart className="w-6 h-6 " />
                  <span className="badge badge-xs indicator-item">{totalProducts}</span>
                </div>
              </Link>
              <p className="text-sm text-black font-bold">{totalPrice.toFixed(2) || (0.0).toFixed(2)} €</p>
            </div>
          </div>
        </div>
        <div className="md:mx-10 flex">
          <div className="navbar bg-primary text-primary-content rounded-xl">
            <div className="navbar-start"></div>
            <div className="navbar-center ">
              <Link to="/novinky" prefetch="intent" className="text-xl font-light btn btn-ghost w-[120px]">
                <div className="flex space-x-1 items-center">
                  <CiBurger />
                  <p>Novinky</p>
                </div>
              </Link>
              <Link to="/pizza" prefetch="intent" className="text-xl font-light btn btn-ghost w-[120px]">
                <div className="flex space-x-1 items-center">
                  <CiPizza />
                  <p>PIZZA</p>
                </div>
              </Link>
              <Link to="/kebab" prefetch="intent" className="text-xl font-light btn btn-ghost w-[120px]">
                <div className="flex space-x-1 items-center">
                  <GiDonerKebab />
                  <p>KEBAB</p>
                </div>
              </Link>
              <Link to="/bageta" prefetch="intent" className="text-xl font-light btn btn-ghost w-[120px]">
                <div className="flex space-x-1 items-center">
                  <GiSandwich />
                  <p>BAGETY</p>
                </div>
              </Link>
              <Link to="/salaty" prefetch="intent" className="text-xl font-light btn btn-ghost w-[120px]">
                <div className="flex space-x-1 items-center">
                  <GiCarrot />
                  <p>ŠALÁTY</p>
                </div>
              </Link>
              <Link to="/napoje" prefetch="intent" className="text-xl font-light btn btn-ghost w-[120px]">
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
  );
}

export default AppLayout;
