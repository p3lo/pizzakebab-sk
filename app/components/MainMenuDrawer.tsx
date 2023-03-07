import { useNavigate } from '@remix-run/react';
import React from 'react';
import { AiOutlineCloseSquare, AiOutlineHome } from 'react-icons/ai';
import { CiBurger, CiPizza } from 'react-icons/ci';
import { GiCarrot, GiDonerKebab, GiGlassShot, GiSandwich } from 'react-icons/gi';

function MainMenuDrawer() {
  const navigate = useNavigate();
  return (
    <div className="p-4 w-[250px] bg-base-content text-base-300">
      <div className="flex flex-col w-full h-full space-y-5">
        <div className="flex flex-col">
          <label htmlFor="my-drawer" className="flex justify-end cursor-pointer drawer-button">
            <AiOutlineCloseSquare className="w-6 h-6" />
          </label>
          <h2 className="flex justify-center w-full text-xl font-bold">Menu</h2>
        </div>
        <div className="flex w-full border-b border-base-100" />
        <div className="flex flex-col space-y-1 ">
          <label htmlFor="my-drawer" className="w-full btn btn-primary drawer-button" onClick={() => navigate('/')}>
            <div className="flex items-center space-x-1">
              <AiOutlineHome />
              <p>Domov</p>
            </div>
          </label>
          <label
            htmlFor="my-drawer"
            className="w-full btn btn-primary drawer-button"
            onClick={() => navigate('/novinky')}
          >
            <div className="flex items-center space-x-1">
              <CiBurger />
              <p>Novinky</p>
            </div>
          </label>
          <label
            htmlFor="my-drawer"
            onClick={() => navigate('/pizza')}
            className="drawer-button w-full btn btn-primary"
          >
            <div className="flex items-center space-x-1">
              <CiPizza />
              <p>PIZZA</p>
            </div>
          </label>
          <label
            htmlFor="my-drawer"
            onClick={() => navigate('/kebab')}
            className="drawer-button w-full btn btn-primary"
          >
            <div className="flex items-center space-x-1">
              <GiDonerKebab />
              <p>KEBAB</p>
            </div>
          </label>
          <label
            htmlFor="my-drawer"
            onClick={() => navigate('/bageta')}
            className=" drawer-button w-full btn btn-primary"
          >
            <div className="flex items-center space-x-1">
              <GiSandwich />
              <p>BAGETY</p>
            </div>
          </label>
          <label
            htmlFor="my-drawer"
            onClick={() => navigate('/salaty')}
            className="drawer-button w-full btn btn-primary"
          >
            <div className="flex items-center space-x-1">
              <GiCarrot />
              <p>ŠALÁTY</p>
            </div>
          </label>
          <label
            htmlFor="my-drawer"
            onClick={() => navigate('/napoje')}
            className="drawer-button w-full btn btn-primary"
          >
            <div className="flex items-center space-x-1">
              <GiGlassShot />
              <p>NÁPOJE</p>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
}

export default MainMenuDrawer;
