import { useFetcher } from '@remix-run/react';
import { useSetAtom } from 'jotai';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import type { Bageta } from '~/types/types';
import { drawerAtom } from '~/utils/drawerAtom';

function BagetaItem({
  bageta,
  bagetaSize,
  bagetaIndex,
}: {
  bageta: Bageta;
  bagetaSize: 'sizeSmall' | 'sizeLarge';
  bagetaIndex: number;
}) {
  const setDrawerType = useSetAtom(drawerAtom);
  const fetcher = useFetcher();
  function setBagetaAtom() {
    setDrawerType('bageta');
  }
  function addToCart() {
    const weight = bagetaSize === 'sizeSmall' ? bageta.sizeSmall?.weight : bageta.sizeLarge?.weight;
    const price = bagetaSize === 'sizeSmall' ? bageta.sizeSmall?.price : bageta.sizeLarge?.price;
    const size = bagetaSize === 'sizeSmall' ? 'mala' : 'velka';
    const bagetaDb = {
      name: bageta.name,
      description: bageta.description,
      price: price || 0,
      type: 'bageta',
      weight: weight || 0,
      size,
    };
    fetcher.submit(
      {
        bageta: JSON.stringify(bagetaDb),
      },
      {
        method: 'post',
      }
    );
  }
  return (
    <div className="flex flex-row items-start justify-between space-x-5">
      <div className="flex flex-col">
        <div className="basis-4/5 flex text-base-300 space-x-1 items-center">
          <h2 className="font-bold text-lg">{bagetaIndex}.</h2>
          <h2 className="font-bold text-lg">{bageta.name}</h2>
          <p className="text-base-100/70 text-sm">
            ( {bagetaSize === 'sizeSmall' ? bageta.sizeSmall?.weight : bageta.sizeLarge?.weight}g )
          </p>
        </div>
        <p className="text-base-100/70 text-sm">{bageta.description}</p>
      </div>
      <div className="basis-1/5 flex space-x-3 items-center">
        <p className="text-base-100 w-[60px]">
          {bagetaSize === 'sizeSmall' ? bageta.sizeSmall?.price.toFixed(2) : bageta.sizeLarge?.price.toFixed(2)} €
        </p>
        <label className="btn btn-circle btn-ghost text-base-100" onClick={addToCart}>
          <AiOutlineShoppingCart className="w-5 h-5 transition duration-300 ease-in-out hover:scale-125" />
        </label>
      </div>
    </div>
  );
}

export default BagetaItem;
