import { AiOutlineShoppingCart } from 'react-icons/ai';
import type { Kebab } from '~/types/types';

function KebabItem({
  kebab,
  kebabSize,
  kebabIndex,
}: {
  kebab: Kebab;
  kebabSize: 'sizeSmall' | 'sizeLarge';
  kebabIndex: number;
}) {
  return (
    <div className="flex flex-row items-start justify-between space-x-5">
      <div className="flex flex-col">
        <div className="basis-4/5 flex text-base-300 space-x-1 items-center">
          <h2 className="font-bold text-lg">{kebabIndex}.</h2>
          <h2 className="font-bold text-lg">{kebab.name}</h2>
          <p className="text-base-100/70 text-sm">
            ( {kebabSize === 'sizeSmall' ? kebab.sizeSmall?.weight : kebab.sizeLarge?.weight}g )
          </p>
        </div>
        <p className="text-base-100/70 text-sm">{kebab.description}</p>
      </div>
      <div className="basis-1/5 flex space-x-3 items-center">
        <p className="text-base-100 w-[60px]">
          {kebabSize === 'sizeSmall' ? kebab.sizeSmall?.price.toFixed(2) : kebab.sizeLarge?.price.toFixed(2)} €
        </p>
        <label htmlFor="my-drawer" className="drawer-button btn btn-circle btn-ghost text-base-100">
          <AiOutlineShoppingCart className="w-5 h-5 transition duration-300 ease-in-out hover:scale-125" />
        </label>
      </div>
    </div>
  );
}

export default KebabItem;
