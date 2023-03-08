import React from 'react';
import { AiOutlineClockCircle, AiOutlineMail, AiOutlinePhone } from 'react-icons/ai';
import { BiMap } from 'react-icons/bi';
import { BsFacebook, BsHouse } from 'react-icons/bs';
import { FaNetworkWired } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="footer p-10 bg-base-300 text-base-content w-full">
      <div>
        <span className="footer-title ">Otváracia doba</span>
        <div className="grid grid-cols-2 gap-x-4 ">
          <div className="flex space-x-1 items-center">
            <AiOutlineClockCircle />
            <p className="text-sm font-semibold">Pondelok</p>
          </div>
          <p className="text-sm">10:00 - 22:00</p>
          <div className="flex space-x-1 items-center">
            <AiOutlineClockCircle />
            <p className="text-sm font-semibold">Útorok</p>
          </div>
          <p className="text-sm">10:00 - 22:00</p>
          <div className="flex space-x-1 items-center">
            <AiOutlineClockCircle />
            <p className="text-sm font-semibold">Streda</p>
          </div>
          <p className="text-sm">10:00 - 22:00</p>
          <div className="flex space-x-1 items-center">
            <AiOutlineClockCircle />
            <p className="text-sm font-semibold">Štvrtok</p>
          </div>
          <p className="text-sm">10:00 - 22:00</p>
          <div className="flex space-x-1 items-center">
            <AiOutlineClockCircle />
            <p className="text-sm font-semibold">Piatok</p>
          </div>
          <p className="text-sm">10:00 - 23:00</p>
          <div className="flex space-x-1 items-center">
            <AiOutlineClockCircle />
            <p className="text-sm font-semibold">Sobota</p>
          </div>
          <p className="text-sm">10:00 - 23:00</p>
          <div className="flex space-x-1 items-center">
            <AiOutlineClockCircle />
            <p className="text-sm font-semibold">Nedeľa</p>
          </div>
          <p className="text-sm">15:00 - 23:00</p>
        </div>
      </div>
      <div>
        <span className="footer-title">Informácie</span>
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 items-start">
          <div className="flex space-x-1 items-center">
            <BiMap />
            <p className="text-sm font-semibold">Adresa:</p>
          </div>
          <a
            target="_blank"
            href="https://www.google.com/maps/place/Pizza+%26+Kebab/@49.1274578,18.328411,18.5z/data=!4m6!3m5!1s0x471488ab3d71d971:0x89b65f7585f61bba!8m2!3d49.1277593!4d18.328463!16s%2Fg%2F11f2_m1nn8"
            className="flex flex-col"
          >
            <p className="text-sm">Pizza & Kebab</p>
            <p className="text-sm">Dvory 1933/20</p>
            <p className="text-sm">Púchov, 02001</p>
          </a>
          <div className="flex space-x-1 items-center">
            <BsHouse />
            <p className="text-sm font-semibold">Spoločnosť:</p>
          </div>
          <p className="text-sm">BuonaResa s.r.o.</p>
        </div>
      </div>
      <div>
        <span className="footer-title">Kontakt</span>
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 items-center">
          <div className="flex space-x-1 items-center">
            <FaNetworkWired />
            <p className="text-sm font-semibold">Sociálne siete:</p>
          </div>
          <a href="https://www.facebook.com/pizzakebab.sk" target="_blank" className="flex space-x-1 items-center">
            <BsFacebook />
            <p className="text-sm">Facebook</p>
          </a>
          <div className="flex space-x-1 items-center">
            <AiOutlineMail />
            <p className="text-sm font-semibold">Email:</p>
          </div>
          <a href="mailto: pizzakebabdvory@gmail.com" target="_blank" className="flex space-x-1 items-center">
            <p className="text-sm">pizzakebabdvory@gmail.com</p>
          </a>
          <div className="flex space-x-1 items-center">
            <AiOutlinePhone />
            <p className="text-sm font-semibold">Telefón:</p>
          </div>
          <a href="tel: +421 944 992 552" target="_blank" className="flex space-x-1 items-center">
            <p className="text-sm">+421 944 992 552</p>
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
