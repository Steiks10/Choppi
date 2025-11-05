export interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  category: string;
  createdAt: string | Date;
  updatedAt: string | Date;
}
