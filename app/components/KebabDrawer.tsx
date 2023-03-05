import { useFetcher } from '@remix-run/react';
import { useAtomValue } from 'jotai';
import React from 'react';
import { AiOutlineCloseSquare, AiOutlineShoppingCart } from 'react-icons/ai';
import { drawerKebabAtom, userIdAtom } from '~/utils/drawerAtom';

function KebabDrawer() {
  const kebab = useAtomValue(drawerKebabAtom);
  const userId = useAtomValue(userIdAtom);

  const [selectPriloha, setSelectPriloha] = React.useState<number>(1);
  const fetcher = useFetcher();

  function addToCart() {
    if (userId) {
      if (selectPriloha === 1) {
        kebab.description = kebab.description.replace('Hranolky/ryža', 'Hranolky');
      } else {
        kebab.description = kebab.description.replace('Hranolky/ryža', 'Ryža');
      }
      fetcher.submit(
        {
          userId,
          kebab: JSON.stringify(kebab),
        },
        {
          method: 'post',
        }
      );
    }
  }
  return (
    <div className="w-full flex flex-col h-full justify-between">
      <div className="flex flex-col space-y-5">
        <div className="flex flex-col">
          <label htmlFor="my-drawer" className="flex justify-end drawer-button cursor-pointer">
            <AiOutlineCloseSquare className="w-6 h-6" />
          </label>
          <h2 className="font-bold flex justify-center text-xl w-full">Kebab</h2>
        </div>
        <div className="flex flex-col space-y-1">
          <div className="flex w-full justify-between">
            <div className="flex flex-col">
              <div className="flex items-center space-x-2">
                <p className="font-semibold">{kebab.name}</p>
                <p className="text-sm text-base-100/70">{kebab.size}</p>
                <p className="text-sm text-base-100/70">( {kebab.weight} g)</p>
              </div>
              <p className="text-sm text-base-100/70">
                {selectPriloha === 1
                  ? kebab.description.replace('Hranolky/ryža', 'Hranolky')
                  : kebab.description.replace('Hranolky/ryža', 'Ryža')}
              </p>
            </div>

            <p>{kebab.price.toFixed(2)} €</p>
          </div>
          <div className="flex w-full justify-between text-sm text-base-100/70">
            <p>+ Krabica a balné</p>
            <p>{(0.4).toFixed(2)} €</p>
          </div>
        </div>
        <div className="flex w-full border-b border-base-100" />
        <h2 className="font-semibold flex justify-center text-lg w-full">Príloha ku kebabu</h2>
        <div className="flex space-x-3 w-full">
          <select
            className="select shrink-0 w-full  select-bordered border-base-100 bg-base-content"
            onChange={(e) => setSelectPriloha(Number(e.target.value))}
            defaultValue={selectPriloha}
          >
            <option value={1} className="text-base-100/50" selected>
              Hranolky
            </option>
            <option value={2} className="text-base-100/50">
              Ryža
            </option>
          </select>
        </div>
      </div>
      <div className="flex flex-col space-y-3">
        <div className="w-full flex justify-between">
          <h3 className="font-bold">Spolu</h3>
          <p>{(kebab.price + 0.4).toFixed(2)} €</p>
        </div>
        <div className="flex w-full border-b border-base-100" />
        <div className="flex justify-center">
          <label htmlFor="my-drawer" className="btn btn-primary drawer-button gap-2" onClick={addToCart}>
            <AiOutlineShoppingCart />
            Pridať do košíka
          </label>
        </div>
      </div>
    </div>
  );
}

export default KebabDrawer;
