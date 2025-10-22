export type OrderItem = {
  _id: string;
  name: string;
  qty: number;
};

export interface OrderItemLine {
  name: string;
  qty: number;
  price: number;
  image: string;
  product: string;
  _id: string;
}

export type ShippingAddress = {
  address: string;
  city: string;
  postalCode: string;
};

export type OrderModel = {
  orderItems: OrderItem[];
  paymentMethod: string;
  shippingAddress: ShippingAddress;
};

export type CreateOrderPayload = {
  orderItems: OrderItem[];
  paymentMethod: string;
  shippingAddress: ShippingAddress;
};

export type OrderResponseModel = {
  _id: string;
  orderItems: OrderItem[];
  paymentMethod: string;
  shippingAddress: ShippingAddress;
};
