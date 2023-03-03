import { Outlet, Link, NavLink } from '@remix-run/react';
import React from 'react';
import { AiFillPhone, AiOutlineShoppingCart } from 'react-icons/ai';
import { CiPizza } from 'react-icons/ci';
import { GiDonerKebab, GiSandwich, GiCarrot, GiGlassShot } from 'react-icons/gi';
import { Image } from '~/components/Image';
import getAllOrderIds from '~/utils/helpers.client';

function AppLayout() {
  const [orders, setOrders] = React.useState<number[]>();
  React.useEffect(() => {
    setOrders(getAllOrderIds());
  }, []);
  return (
    <div className="min-h-screen w-full  ">
      <div className="flex flex-col space-y-5">
        <div className="md:mx-10 flex items-center justify-between pt-5">
          <div className="basis-1/3 ">
            <div className="flex flex-col p-3 border rounded-full bg-white w-[220px]">
              <p className="text-xs">Zavolajte alebo objednajte online</p>
              <div className="flex space-x-2 items-center justify-center">
                <AiFillPhone className="inline-block text-black" />
                <a href="tel:+421944992552" className="text-sm font-bold text-black">
                  +421 944 992 552
                </a>
              </div>
            </div>
          </div>
          <NavLink to="/" end className="basis-1/3 flex justify-center">
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
            <div className="flex  py-1 px-2 border w-[115px] rounded-full bg-white items-center justify-center space-x-3">
              <div className="btn btn-circle btn-ghost">
                <div className="indicator ">
                  <AiOutlineShoppingCart className="w-6 h-6 " />
                  <span className="badge badge-xs indicator-item">0</span>
                </div>
              </div>
              <p className="text-sm text-black font-bold">100 €</p>
            </div>
          </div>
        </div>
        <div className="md:mx-10 flex">
          <div className="navbar bg-primary text-primary-content rounded-xl">
            <div className="navbar-start"></div>
            <div className="navbar-center ">
              <Link to="/pizza" className="text-xl font-light btn btn-ghost w-[120px]">
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
  );
}

export default AppLayout;
