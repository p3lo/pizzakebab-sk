import { useSetAtom } from 'jotai';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import type { Pizza } from '~/types/types';
import { drawerAtom, drawerPizzaAtom } from '~/utils/drawerAtom';

function PizzaItem({
  pizza,
  pizzaSize,
  pizzaIndex,
}: {
  pizza: Pizza;
  pizzaSize: 'size32cm' | 'size50cm';
  pizzaIndex: number;
}) {
  const setPizza = useSetAtom(drawerPizzaAtom);
  const setDrawerType = useSetAtom(drawerAtom);
  function setPizzaAtom() {
    const weight = pizzaSize === 'size32cm' ? pizza.size32cm?.weight : pizza.size50cm?.weight;
    const price = pizzaSize === 'size32cm' ? pizza.size32cm?.price : pizza.size50cm?.price;
    const size = pizzaSize === 'size32cm' ? '32cm' : '50cm';
    setPizza({
      name: pizza.name,
      description: pizza.description,
      price: price || 0,
      type: 'pizza',
      weight: weight || 0,
      size,
    });
    setDrawerType('pizza');
  }
  return (
    <div className="flex flex-row items-start justify-between space-x-3 sm:space-x-5">
      <div className="flex flex-col">
        <div className="basis-4/5 flex text-base-300 space-x-1 items-center">
          <h2 className="font-bold sm:text-lg">{pizzaIndex}.</h2>
          <h2 className="font-bold sm:text-lg">{pizza.name}</h2>
          <p className="text-base-100/70 text-xs sm:text-sm whitespace-nowrap">
            ( {pizzaSize === 'size32cm' ? pizza.size32cm?.weight : pizza.size50cm?.weight}g )
          </p>
        </div>
        <p className="text-base-100/70 text-xs sm:text-sm">{pizza.description}</p>
      </div>
      <div className="basis-1/5 flex space-x-1 sm:space-x-3 justify-end items-center">
        <p className="text-base-100 whitespace-nowrap text-sm sm:text-md">
          {pizzaSize === 'size32cm' ? pizza.size32cm?.price.toFixed(2) : pizza.size50cm?.price.toFixed(2)} €
        </p>
        <label
          htmlFor="my-drawer"
          className="drawer-button btn btn-circle btn-ghost text-base-100"
          onClick={setPizzaAtom}
        >
          <AiOutlineShoppingCart className="w-5 h-5 transition duration-300 ease-in-out hover:scale-125" />
        </label>
      </div>
    </div>
  );
}

export default PizzaItem;
