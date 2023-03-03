export type Pizza = {
  id: number;
  name: string;
  description: string;
  size32cm?: {
    id: number;
    weight: number;
    price: number;
    pizza?: Pizza;
    pizzaId?: number | null;
  };
  size50cm?: {
    id: number;
    weight: number;
    price: number;
    pizza?: Pizza;
    pizzaId?: number | null;
  };
};

export type Kebab = {
  id: number;
  name: string;
  description: string;
  small: {
    weight: string;
    price: string;
  };
  large: {
    weight: string;
    price: string;
  };
};

export type Products = [Pizza, Kebab];
