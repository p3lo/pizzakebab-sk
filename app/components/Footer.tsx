import React from 'react';
import {
  AiOutlineClockCircle,
  AiOutlineContacts,
  AiOutlineInfoCircle,
  AiOutlineMail,
  AiOutlinePhone,
} from 'react-icons/ai';
import { BiMap } from 'react-icons/bi';
import { BsFacebook, BsHouse } from 'react-icons/bs';
import { FaNetworkWired } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="w-full p-10 footer bg-base-300 text-base-content">
      <div>
        <div className="flex items-center space-x-1">
          <AiOutlineClockCircle className="footer-title " />
          <p className="footer-title ">Otváracia doba</p>
        </div>
        <div className="grid grid-cols-2 gap-x-4 ">
          <p className="text-sm font-semibold">Pondelok</p>

          <p className="text-sm">10:00 - 22:00</p>

          <p className="text-sm font-semibold">Útorok</p>

          <p className="text-sm">10:00 - 22:00</p>

          <p className="text-sm font-semibold">Streda</p>

          <p className="text-sm">10:00 - 22:00</p>

          <p className="text-sm font-semibold">Štvrtok</p>

          <p className="text-sm">10:00 - 22:00</p>

          <p className="text-sm font-semibold">Piatok</p>

          <p className="text-sm">10:00 - 23:00</p>

          <p className="text-sm font-semibold">Sobota</p>

          <p className="text-sm">10:00 - 23:00</p>

          <p className="text-sm font-semibold">Nedeľa</p>

          <p className="text-sm">15:00 - 23:00</p>
        </div>
      </div>
      <div>
        <div className="flex items-center space-x-1">
          <AiOutlineInfoCircle className="footer-title " />
          <p className="footer-title">Informácie</p>
        </div>
        <div className="grid items-start grid-cols-2 gap-x-4 gap-y-2">
          <div className="flex items-center space-x-1">
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
          <div className="flex items-center space-x-1">
            <BsHouse />
            <p className="text-sm font-semibold">Spoločnosť:</p>
          </div>
          <p className="text-sm">BuonaResa s.r.o.</p>
        </div>
      </div>
      <div>
        <div className="flex items-center space-x-1">
          <AiOutlineContacts className="footer-title " />
          <p className="footer-title">Kontakt</p>
        </div>
        <div className="grid items-center grid-cols-2 gap-x-4 gap-y-2">
          <div className="flex items-center space-x-1">
            <FaNetworkWired />
            <p className="text-sm font-semibold">Sociálne siete:</p>
          </div>
          <a href="https://www.facebook.com/pizzakebab.sk" target="_blank" className="flex items-center space-x-1">
            <BsFacebook />
            <p className="text-sm">Facebook</p>
          </a>
          <div className="flex items-center space-x-1">
            <AiOutlineMail />
            <p className="text-sm font-semibold">Email:</p>
          </div>
          <a href="mailto: pizzakebabdvory@gmail.com" target="_blank" className="flex items-center space-x-1">
            <p className="text-sm">pizzakebabdvory@gmail.com</p>
          </a>
          <div className="flex items-center space-x-1">
            <AiOutlinePhone />
            <p className="text-sm font-semibold">Telefón:</p>
          </div>
          <a href="tel: +421 944 992 552" target="_blank" className="flex items-center space-x-1">
            <p className="text-sm">+421 944 992 552</p>
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
