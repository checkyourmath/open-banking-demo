"use client"

import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { CreateOrderDto, Product } from '@shared/interface';
import { createOrder } from '@shared/http/orders.http';
import { redirect } from 'next/navigation';
interface CartState {
  isPurchasing: boolean;
  cartProducts: Product[];
}

const initialState: CartState = {
  isPurchasing: false,
  cartProducts: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {

    cart_start_purchase: (state) => {
      state.isPurchasing = true;
    },
    cart_stop_purchase: (state) => {
      state.isPurchasing = false;
    },
    cart_force_clear: (state) => {
      state.cartProducts = [];
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
  extraReducers: (builder) => {

  }
});

export const {
  cart_product,
  remove_cart_product,
  clear_cart,
  decrease_quantity,
  cart_start_purchase,
  cart_stop_purchase,
  cart_force_clear
} = cartSlice.actions;

export const purchaseAction = createAsyncThunk(
  'cart/purchase',
  async (payload: any, { getState, dispatch }) => {
    const state = getState() as { cart: CartState };
    const { cartProducts, isPurchasing } = state.cart;

    if (!cartProducts.length || isPurchasing) {
      return;
    }

    dispatch(cart_start_purchase());

    const createOrderDto: CreateOrderDto = {
      items: cartProducts.map((cartProduct) => ({
        productId: cartProduct.id,
        quantity: cartProduct.quantity
      }))
    };

    createOrder(createOrderDto)
      .then((order) => {
        dispatch(cart_stop_purchase());
        dispatch(cart_force_clear());

        window.location.replace(order.paymentLink);
      })
      .catch(() => {
        dispatch(cart_stop_purchase());

        toast.error(`Order creation error`, {
          position: "top-left",
        });
      });

  },
)

export default cartSlice.reducer;
