export type Pizza = {
  id: number;
  name: string;
  description: string;
  '32cm': {
    weight: string;
    price: string;
  };
  '50cm': {
    weight: string;
    price: string;
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
