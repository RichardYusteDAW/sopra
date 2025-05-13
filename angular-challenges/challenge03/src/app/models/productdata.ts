import { Product } from './product';
import { Review } from './review';

export interface Productdata {
  name: string;
  price: number;
  currency: string;
  rating: number;
  description: string;
  favorite: boolean;
  similarProducts: Product[];
  reviews: Review[] | null;
}
