export type Pizza = {
  id: number;
  name: string;
  description: string;
  size32cm?: {
    id: number;
    weight: number;
    price: number;
  };
  size50cm?: {
    id: number;
    weight: number;
    price: number;
  };
};

export type Kebab = {
  id: number;
  name: string;
  description: string;
  sizeSmall?: {
    weight: number;
    price: number;
  };
  sizeLarge?: {
    weight: number;
    price: number;
  };
};

export type Products = [Pizza, Kebab];
