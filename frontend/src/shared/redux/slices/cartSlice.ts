"use client"

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { Order, Product } from '@shared/interface';
interface CartState {
  cartProducts: Product[];
}

const initialState: CartState = {
  cartProducts: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {

    cart_purchase: (state) => {
      const { cartProducts } = state;

      if (!cartProducts.length) {
        return;
      }

      const order: Order = [];

      cartProducts.forEach(product => {
        order.push({
          productId: product.id,
          quantity: product.quantity
        })
      });
    },

    cart_product: (state, { payload }: PayloadAction<Product>) => {
      const productIndex = state.cartProducts.findIndex(
        (item: Product) => item.id === payload.id
      );
      if (productIndex >= 0) {
        state.cartProducts[productIndex].quantity! += 1;
        toast.info("Increase Product Quantity", {
          position: "top-left",
        });
      } else {
        const tempProduct = { ...payload, quantity: 1 };
        state.cartProducts.push(tempProduct);
        toast.success(`${payload.title} added to cart`, {
          position: "top-left",
        });
      }
    },
    remove_cart_product: (state, { payload }: PayloadAction<Product>) => {
      state.cartProducts = state.cartProducts.filter(
        (item: Product) => item.id !== payload.id
      );
      toast.error(`Remove from your cart`, {
        position: "top-left",
      });
    },

    clear_cart: (state) => {
      const confirmMsg = window.confirm(
        "Are you sure deleted your all cart items ?"
      );
      if (confirmMsg) {
        state.cartProducts = [];
      }
    },

    decrease_quantity: (state, { payload }: PayloadAction<Product>) => {
      const cartIndex = state.cartProducts.findIndex(
        (item: Product) => item.id === payload.id
      );
      if (cartIndex >= 0) {
        const totalCart = state.cartProducts[cartIndex].quantity ?? 0;
        if (totalCart > 1) {
          state.cartProducts[cartIndex].quantity = totalCart - 1;
          toast.error(`Decrease cart quantity`, { position: "top-left", });
        }
        else {
          toast.error(`Quantity cannot be less than 1`);
        }
      }
    },
  },
});

export const {
  cart_product,
  remove_cart_product,
  clear_cart,
  decrease_quantity,
  cart_purchase,
} = cartSlice.actions;

export default cartSlice.reducer;
