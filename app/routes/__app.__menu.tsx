import { Outlet } from '@remix-run/react';
import React from 'react';

function MenuLayout() {
  return (
    <div className="px-[0%] sm:px-[10%] md:px-[15%] lg:px-[20%] xl:px-[25%] py-10 w-full flex">
      <Outlet />
    </div>
  );
}

export default MenuLayout;
