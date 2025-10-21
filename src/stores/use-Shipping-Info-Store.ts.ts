import { create } from "zustand";
import type { OrderShippingInformation } from "@/types/order.Shipping.model";

interface ShippingStore {
  shippingData: OrderShippingInformation;
  activeStep: number;
  updateShippingField: (name: string, value: string) => void;
  clearShippingData: () => void;
}

export const useShippingStore = create<ShippingStore>((set) => ({
  shippingData: {
    address: "",
    city: "",
    country: "",
    postalCode: "",
    paymentMethod: "pasargad",
  },
  activeStep: 2,
  updateShippingField: (name, value) =>
    set((state) => ({
      shippingData: {
        ...state.shippingData,
        [name]: value,
      },
    })),
  clearShippingData: () =>
    set({
      shippingData: {
        address: "",
        city: "",
        country: "",
        postalCode: "",
        paymentMethod: "pasargad",
      },
      activeStep: 2,
    }),
}));
