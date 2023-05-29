type Dispatch<A> = (value: A) => void;

export interface IProduct {
  ID: number;
  name: string;
  price: number;
  CreatedAt: string;
  DeletedAt: string;
  UpdatedAt: string;
}

export type IShopContextState = {
  products: IProduct[];
}