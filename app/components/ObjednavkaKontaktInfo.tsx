import React from 'react';
import { AiOutlineRollback } from 'react-icons/ai';
import type { LoaderData } from '~/routes/__app.__menu.objednavka';

function ObjednavkaKontaktInfo({ objednavka, totalPrice, goToContactInfo }: LoaderData) {
  const [city, setCity] = React.useState('1');

  function getStringForCitySelect() {
    const getCityObject = doprava.find((cityObj) => cityObj.id.toString() === city);
    if (getCityObject) {
      if (getCityObject.minObjednavka === 25) {
        return (
          'Doprava: ' +
          getCityObject.doprava.toFixed(2) +
          ' € / km, minimalna objednávka: ' +
          getCityObject.minObjednavka.toFixed(2) +
          ' €'
        );
      }
      return (
        'Doprava: ' +
        getCityObject.doprava.toFixed(2) +
        ' €, minimalna objednávka: ' +
        getCityObject.minObjednavka.toFixed(2) +
        ' €'
      );
    }
    return null;
  }
  return (
    <div className="flex flex-col justify-center w-full space-y-10">
      <h1 className="flex justify-center text-2xl font-bold text-base-content">Kontaktný formulár</h1>
      <div className="w-full shadow-2xl rounded-2xl bg-base-content shadow-primary-content">
        <button
          className="m-2 transition ease-in-out delay-150 btn btn-circle btn-ghost hover:-translate-y-1 hover:scale-110"
          onClick={() => goToContactInfo(true)}
        >
          <AiOutlineRollback className="w-5 h-5 font-bold text-base-100" />
        </button>
        <div className="mx-5 mb-5">
          <div className="flex flex-col space-y-2">
            <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
              <div className="w-full form-control">
                <label className="label ">
                  <span className="label-text text-base-100">* Meno</span>
                </label>
                <input
                  required
                  type="text"
                  placeholder="Vaše meno"
                  className="w-full input border-base-100 input-bordered bg-base-content text-base-100 placeholder-base-100/50"
                />
              </div>
              <div className="w-full form-control">
                <label className="label ">
                  <span className="label-text text-base-100">* Priezvisko</span>
                </label>
                <input
                  required
                  type="text"
                  placeholder="Vaše priezvisko"
                  className="w-full input border-base-100 input-bordered bg-base-content text-base-100 placeholder-base-100/50"
                />
              </div>
            </div>
            <div className="w-full form-control">
              <label className="label ">
                <span className="label-text text-base-100">* Adresa</span>
              </label>
              <input
                required
                type="text"
                placeholder="Vaša ulica + číslo domu"
                className="w-full input border-base-100 input-bordered bg-base-content text-base-100 placeholder-base-100/50"
              />
            </div>
            <div className="w-full form-control">
              <label className="label ">
                <span className="label-text text-base-100">* Mesto / obec</span>
              </label>
              <select
                defaultValue={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full select select-bordered border-base-100 bg-base-content text-base-100"
              >
                {doprava.map((doprava) => (
                  <option key={doprava.id} value={doprava.id}>
                    {doprava.city}
                  </option>
                ))}
              </select>
              <label className="label">
                <span className="label-text-alt text-base-100">{getStringForCitySelect()}</span>
              </label>
            </div>
            <div className="w-full form-control">
              <label className="label ">
                <span className="label-text text-base-100">* Email</span>
              </label>
              <label className="input-group">
                <span>Email</span>
                <input
                  type="email"
                  placeholder="jozko.mrkvicka@gmail.com"
                  className="w-full input border-base-100 input-bordered bg-base-content text-base-100 placeholder-base-100/50"
                />
              </label>
            </div>
            <div className="w-full form-control">
              <label className="label ">
                <span className="label-text text-base-100">* Telefónne číslo</span>
              </label>
              <label className="input-group">
                <span>+421</span>
                <input
                  type="tel"
                  placeholder="903666999"
                  pattern="[0-9]{3}[0-9]{3}[0-9]{3}"
                  maxLength={9}
                  className="w-full input border-base-100 input-bordered bg-base-content text-base-100 placeholder-base-100/50"
                />
              </label>
            </div>
            <div className="flex justify-center pt-5">
              {doprava.find((cityObj) => cityObj.id.toString() === city)?.minObjednavka! > totalPrice ? (
                <p className="text-xs text-error">
                  * Pre dokončenie objednávky nakúpte ešte za:{' '}
                  <span>
                    {(doprava.find((cityObj) => cityObj.id.toString() === city)?.minObjednavka! - totalPrice).toFixed(
                      2
                    )}
                  </span>{' '}
                  €
                </p>
              ) : (
                <button className="btn btn-primary" onClick={() => goToContactInfo(false)}>
                  Odoslať Objednávku
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ObjednavkaKontaktInfo;

const doprava = [
  {
    id: 1,
    city: 'Púchov',
    doprava: 0.6,
    minObjednavka: 5,
  },
  {
    id: 2,
    city: 'Nové Nosice',
    doprava: 0.6,
    minObjednavka: 5,
  },
  {
    id: 3,
    city: 'Kolonka',
    doprava: 0.6,
    minObjednavka: 5,
  },
  {
    id: 4,
    city: 'Hrabovka',
    doprava: 0.6,
    minObjednavka: 5,
  },
  {
    id: 5,
    city: 'Kéblie',
    doprava: 0.6,
    minObjednavka: 5,
  },
  {
    id: 6,
    city: 'Horné Kočkovce',
    doprava: 0.6,
    minObjednavka: 5,
  },
  {
    id: 7,
    city: 'Staré Nosice',
    doprava: 1,
    minObjednavka: 7,
  },
  {
    id: 8,
    city: 'Streženice',
    doprava: 1,
    minObjednavka: 7,
  },
  {
    id: 9,
    city: 'Nimnica',
    doprava: 1,
    minObjednavka: 7,
  },
  {
    id: 10,
    city: 'Dolné Kočkovce',
    doprava: 1,
    minObjednavka: 7,
  },
  {
    id: 11,
    city: 'Vieska Bezdedov',
    doprava: 1,
    minObjednavka: 7,
  },
  {
    id: 12,
    city: 'Nimnica kúpele',
    doprava: 1.5,
    minObjednavka: 8,
  },
  {
    id: 13,
    city: 'Ihrište',
    doprava: 1.5,
    minObjednavka: 8,
  },
  {
    id: 14,
    city: 'Hoštiná',
    doprava: 1.5,
    minObjednavka: 8,
  },
  {
    id: 15,
    city: 'Dohňany',
    doprava: 1.5,
    minObjednavka: 8,
  },
  {
    id: 16,
    city: 'Horenická Hôrka',
    doprava: 2.5,
    minObjednavka: 15,
  },
  {
    id: 17,
    city: 'Lednické Rovne',
    doprava: 2.5,
    minObjednavka: 15,
  },
  {
    id: 18,
    city: 'Zbora',
    doprava: 2.5,
    minObjednavka: 15,
  },
  {
    id: 19,
    city: 'Mestečko',
    doprava: 2.5,
    minObjednavka: 15,
  },
  {
    id: 20,
    city: 'Beluša',
    doprava: 2.5,
    minObjednavka: 15,
  },
  {
    id: 21,
    city: 'Záriečie',
    doprava: 2.5,
    minObjednavka: 15,
  },
  {
    id: 22,
    city: 'Lúky',
    doprava: 3.5,
    minObjednavka: 20,
  },
  {
    id: 23,
    city: 'Dolná Breznica',
    doprava: 3.5,
    minObjednavka: 20,
  },
  {
    id: 24,
    city: 'Horovce',
    doprava: 3.5,
    minObjednavka: 20,
  },
  {
    id: 25,
    city: 'Visolaje',
    doprava: 3.5,
    minObjednavka: 20,
  },
  {
    id: 26,
    city: 'Belušské Slatiny',
    doprava: 3.5,
    minObjednavka: 20,
  },
  {
    id: 27,
    city: 'Udiča',
    doprava: 3.5,
    minObjednavka: 20,
  },
  {
    id: 28,
    city: 'Lysá pod Makytou',
    doprava: 0.4,
    minObjednavka: 25,
  },
  {
    id: 29,
    city: 'Lazy pod Makytou',
    doprava: 0.4,
    minObjednavka: 25,
  },
  {
    id: 30,
    city: 'Horná Breznica',
    doprava: 0.4,
    minObjednavka: 25,
  },
  {
    id: 31,
    city: 'Mojtín',
    doprava: 0.4,
    minObjednavka: 25,
  },
  {
    id: 32,
    city: 'Ladce',
    doprava: 0.4,
    minObjednavka: 25,
  },
  {
    id: 33,
    city: 'Pružina',
    doprava: 0.4,
    minObjednavka: 25,
  },
];
