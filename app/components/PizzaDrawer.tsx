import { useAtomValue } from 'jotai';
import React from 'react';
import { drawerPizzaAtom, drawerPizzaPrilohyAtom, userIdAtom } from '~/utils/drawerAtom';
import { AiOutlineShoppingCart, AiOutlineCloseSquare } from 'react-icons/ai';
import { MdAddShoppingCart } from 'react-icons/md';
import { BsTrash } from 'react-icons/bs';
import { useFetcher } from '@remix-run/react';

function PizzaDrawer() {
  const pizza = useAtomValue(drawerPizzaAtom);
  const prilohy = useAtomValue(drawerPizzaPrilohyAtom);
  const userId = useAtomValue(userIdAtom);

  const [vybranePrilohy, setVybranePrilohy] = React.useState<typeof prilohy>([]);
  const [selectPriloha, setSelectPriloha] = React.useState<number | null>(null);

  const fetcher = useFetcher();

  function getSumPrice() {
    const sum = pizza.price + (pizza.size === '32cm' ? 0.4 : 1.2);
    if (vybranePrilohy.length > 0) {
      return sum + vybranePrilohy.reduce((acc, curr) => acc + curr.price, 0);
    }
    return sum;
  }

  function addVybranaPriloha() {
    if (selectPriloha) {
      const priloha = prilohy.find((priloha) => priloha.id === selectPriloha);
      if (priloha) {
        setVybranePrilohy((prev) => [...prev, priloha]);
      }
    }
  }

  function removePriloha(index: number) {
    setVybranePrilohy((prev) => prev.filter((_, i) => i !== index));
  }

  function addToCart() {
    setVybranePrilohy([]);
    if (userId) {
      fetcher.submit(
        {
          userId,
          pizza: JSON.stringify(pizza),
          prilohy: JSON.stringify(vybranePrilohy.map(({ id, size, ...rest }) => rest)),
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
          <h2 className="font-bold flex justify-center text-xl w-full">Pizza</h2>
        </div>
        <div className="flex flex-col space-y-1">
          <div className="flex w-full justify-between">
            <div className="flex flex-col">
              <div className="flex items-center space-x-2">
                <p className="font-semibold">{pizza.name}</p>
                <p className="text-sm text-base-100/70">{pizza.size}</p>
                <p className="text-sm text-base-100/70">( {pizza.weight} g)</p>
              </div>
              <p className="text-sm text-base-100/70">{pizza.description}</p>
            </div>

            <p>{pizza.price.toFixed(2)} €</p>
          </div>
          <div className="flex w-full justify-between text-sm text-base-100/70">
            <p>+ Krabica a balné</p>
            <p>{pizza.size === '32cm' ? (0.4).toFixed(2) : (1.2).toFixed(2)} €</p>
          </div>
          {vybranePrilohy.length > 0 &&
            vybranePrilohy.map((priloha, index) => (
              <div key={priloha.id} className="flex w-full justify-between text-sm text-base-100/70">
                <p>
                  + {priloha.name} {priloha.weight !== 0 && `(${priloha.weight} g)`}
                </p>
                <div className="flex space-x-3 items-center">
                  <p>{priloha.price.toFixed(2)} €</p>

                  <BsTrash className="w-4 h-4 cursor-pointer text-red-700" onClick={removePriloha.bind(null, index)} />
                </div>
              </div>
            ))}
        </div>
        <div className="flex w-full border-b border-base-100" />
        <h2 className="font-semibold flex justify-center text-lg w-full">Prílohy na pizzu</h2>
        <div className="flex space-x-3 w-full">
          <select
            className="select shrink-0 w-full max-w-xs select-bordered border-base-100 bg-base-content"
            onChange={(e) => setSelectPriloha(Number(e.target.value))}
          >
            <option className="text-base-100/50" disabled selected>
              Vyberte prílohu
            </option>
            {prilohy.map(
              (priloha) =>
                priloha.size === pizza.size && (
                  <option key={priloha.id} value={priloha.id}>
                    {priloha.name} {priloha.weight !== 0 && `(${priloha.weight} g)`} - {priloha.price.toFixed(2)} €
                  </option>
                )
            )}
          </select>
          <button className="btn btn-outline btn-primary grow gap-2" onClick={addVybranaPriloha}>
            <MdAddShoppingCart />
            Pridať
          </button>
        </div>
      </div>
      <div className="flex flex-col space-y-3">
        <div className="w-full flex justify-between">
          <h3 className="font-bold">Spolu</h3>
          <p>{getSumPrice().toFixed(2)} €</p>
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

export default PizzaDrawer;
