import { Product } from '@/types/product';
import { atom } from 'jotai';

export type CartItem = {
  product: Product;
  quantity: number;
};

export const cartAtom = atom([] as CartItem[]);
