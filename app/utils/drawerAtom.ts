import { atom } from 'jotai';

export const drawerPizzaAtom = atom({ name: '', description: '', price: 0, type: '', weight: 0, size: '' });

export const drawerKebabAtom = atom({ name: '', description: '', price: 0, type: '', weight: 0, size: '' });

export const userIdAtom = atom('');

export const drawerPizzaPrilohyAtom = atom([{ id: 0, name: '', price: 0, weight: 0, size: '' }]);

export const drawerAtom = atom('root');
