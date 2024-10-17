import { Product } from '@shared/interface';
import {
    cart_product,
    cart_stop_purchase,
    clear_cart,
    decrease_quantity, purchaseAction
} from '@shared/redux/slices/cartSlice';
import { clear_wishlist, wishlist_product } from '@shared/redux/slices/wishlist-slice';
import { RootState } from '@shared/redux/store';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

const useCart = () => {
    const dispatch = useDispatch();

    const purchase = () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      dispatch(purchaseAction());
    };
    const stopPurchase = () => {
        dispatch(cart_stop_purchase());
    }

    // Add product on cart
    const UseAddToCart = (product: Product) => {
        dispatch(cart_product(product));
    };
    // Add product on wishlist 
    const UseAddToWishlist = (product: Product) => {
        dispatch(wishlist_product(product));
    };
    //  Remove single product form  cart 
    const UseRemoveDecreaseCart = (product: Product) => {
        dispatch(decrease_quantity(product));
    };

    // Remove all cart products
    const UseClearCart = () => {
        dispatch(clear_cart());
    };

    //  Remove all wishlist products
    const UseClearWishlist = () => {
        dispatch(clear_wishlist());
    };

    // Cart quantity
    const UseCartProductQuantity = () => {
        const cartProducts = useSelector(
            (state: RootState) => state.cart.cartProducts
        );
        const uniqueProductId = new Set();
        cartProducts.forEach((product: any) => uniqueProductId.add(product.id));
        return uniqueProductId.size;
    };
    // Wishlist quantity
    const UseWishlstQuantity = () => {
        const cartProducts = useSelector(
            (state: RootState) => state?.wist.cartProducts
        );
        const uniqueProductId = new Set();
        cartProducts?.forEach((product: any) => uniqueProductId.add(product.id));

        return uniqueProductId.size;
    }

    return {
        UseAddToCart,
        UseAddToWishlist,
        UseCartProductQuantity,
        UseWishlstQuantity,
        UseClearCart,
        UseClearWishlist,
        UseRemoveDecreaseCart,
        purchase,
        stopPurchase
    }
};

export default useCart;
