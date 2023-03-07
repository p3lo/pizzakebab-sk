import React from 'react';
import type { LoaderData } from '~/routes/__app.__menu.objednavka';

function ObjednavkaKontaktInfo({ objednavka, totalPrice, goToContactInfo }: LoaderData) {
  return (
    <div className="flex flex-col justify-center w-full space-y-10">
      <h1 className="flex justify-center text-2xl font-bold text-white">Kontaktný formulár</h1>
      <div className="w-full shadow-lg rounded-2xl bg-base-content shadow-neutral-content/25">
        <div className="m-5">
          <div className="flex justify-center">
            <button className="btn btn-primary" onClick={() => goToContactInfo(true)}>
              Späť
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ObjednavkaKontaktInfo;
