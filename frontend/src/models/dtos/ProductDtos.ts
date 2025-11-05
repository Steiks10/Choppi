export interface CreateProductDTO {
  name: string;
  description?: string | null;
  price: number;
  category: string;
}

export interface ProductDTO {
  id: string;
  name: string;
  description: string | null;
  price: number;
  category: string;
}

export interface ProductResponse {
  data?: ProductDTO;
  message?: string;
}
