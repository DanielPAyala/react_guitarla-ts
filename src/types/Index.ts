export type Guitar = {
  id: number;
  name: string;
  image: string;
  description: string;
  price: number;
  quantity?: number;
};

export type CartItem = Guitar & {
  quantity: number;
};

// export type GuitarID = Pick<Guitar, 'id'>
// export type GuitarID = Guitar['id']

// export type CartItem = Omit<Guitar, 'id'> & {
//   quantity: number;
// };

// export type CartItem = Pick<Guitar, 'id'> & {
//   quantity: number;
// };
