export interface Order {
    id: number;
    products: {
      productId: number;
      quantity: number;
    }[];
    totalAmount: number;
    phone: string;
    status: boolean;
  }