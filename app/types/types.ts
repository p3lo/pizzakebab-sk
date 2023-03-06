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

export type Pizzaprilohy = {
  id: number;
  name: string;
  prilohy32cm?: {
    id: number;
    weight?: number;
    price: number;
  };
  prilohy50cm?: {
    id: number;
    weight?: number;
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

export type Bageta = {
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

export type Salaty = {
  id: number;
  name: string;
  description: string;
  weight: number;
  price: number;
};

export type Novinky = {
  id: number;
  name: string;
  description: string;
  weight: number;
  price: number;
};

export type Napoje = {
  id: number;
  name: string;
  description: string;
  type: string;
  price: number;
};

export type Products = [Pizza, Kebab];
