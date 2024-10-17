"use client"
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { remove_cart_product } from '@shared/redux/slices/cartSlice';
import { useSelector } from 'react-redux';
import { RootState } from '@shared/redux/store';
import { Product } from '@shared/interface/';
import useCart from '@shared/hooks/useCart';
import { Loader } from '@shared/components/common/loader';

const CartMainArea = () => {
    const [ isLoading, setIsLoading ] = useState(false);
    const { UseAddToCart, UseClearCart, UseRemoveDecreaseCart, purchase } = useCart();
    const dispatch = useDispatch();
    const handleRemoveCart = (product: Product) => {
        dispatch(remove_cart_product(product));
    };
    const cartProducts = useSelector(
        (state: RootState) => state.cart.cartProducts
    );
    const totalPrice = cartProducts.reduce((total, product) => {
        if (typeof product.price === 'number' && product.price !== 0) {
            return total + (product.price ?? 0) * (product.quantity ?? 0);
        }
        return total;
    }, 0);

    return (
        <>
            {cartProducts.length === 0 && (
                <div className="container">
                    <div className="empty-text pt-100 pb-60 text-center">
                        <h3>Your cart is empty</h3>
                    </div>
                </div>
            )}
            {cartProducts.length >= 1 && (
                <section className="cart-area pt-100 pb-100">
                    <div className="container">
                        {isLoading && <div style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: 'black',
                            background: 'rgba(0, 0, 0, 0.1)',
                            zIndex: 100000,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Loader/>
                        </div>}
                        <div className="row">
                            <div className="col-12">
                                <div className="table-content table-responsive">
                                    <table className="table">
                                        <thead>
                                        <tr>
                                            <th className="product-thumbnail">Images</th>
                                            <th className="cart-product-name">Product</th>
                                            <th className="product-price">Unit Price</th>
                                            <th className="product-quantity">Quantity</th>
                                            <th className="product-subtotal">Total</th>
                                            <th className="product-remove">Remove</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {cartProducts?.map((item: any, index) => {
                                              const totalPrice = item.price * item.quantity

                                              return (
                                                <tr key={index}>
                                                    <td className="product-thumbnail"><Link href="#">
                                                        <Image
                                                          src={item.image}
                                                          width={0}
                                                          height={0}
                                                          style={{width: "auto", height: "auto"}}
                                                          alt="image not found"
                                                        />
                                                    </Link></td>
                                                    <td className="product-name"><Link href="#"> {item?.title}</Link></td>
                                                    <td className="product-price"><span
                                                      className="amount">{item?.price === 0 ? "FREE" : `$${item?.price}`}</span>
                                                    </td>
                                                    <td className="product-quantity">
                                                        <form onSubmit={(e) => e.preventDefault()}>
                                                            <div className="cart-plus-minus">
                                                                <input readOnly value={item?.quantity} onChange={() => {
                                                                }}/>
                                                                <button onClick={() => UseRemoveDecreaseCart(item)}
                                                                  className='dec qtybutton'>-
                                                                </button>
                                                                <button onClick={() => UseAddToCart(item)}
                                                                  className='inc qtybutton'>+
                                                                </button>
                                                            </div>
                                                        </form>
                                                    </td>
                                                    <td className="product-subtotal"><span
                                                      className="amount">{totalPrice.toFixed(2) ? `$${totalPrice.toFixed(2)}` : 0}</span>
                                                    </td>
                                                    <td className="product-remove" onClick={() => handleRemoveCart(item)}>
                                                        <Link href="#"><i className="fa fa-times"></i></Link></td>
                                                </tr>
                                              )
                                          }
                                        )}

                                        </tbody>
                                    </table>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <div className="coupon-all">
                                            <div className="coupon">
                                                {/*<input id="coupon_code" className="input-text" name="coupon_code" defaultValue=""*/}
                                                {/*    placeholder="Coupon code" type="text" />*/}
                                                {/*<button className="c-btn theme-btn-2" name="apply_coupon" type="submit">Apply*/}
                                                {/*    coupon</button>*/}
                                            </div>
                                            <div className="coupon2">
                                                <input className="c-btn theme-btn" name="update_cart"
                                                  onClick={() => UseClearCart()} value="Clear cart" type="submit"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-5 ml-auto">
                                        <div className="cart-page-total">
                                            <h2>Cart totals</h2>
                                            <ul className="mb-20">
                                                {/*<li>*/}
                                                {/*    Subtotal <span>${totalPrice.toFixed(2)}</span>*/}
                                                {/*</li>*/}
                                                <li>
                                                    Total <span>${totalPrice.toFixed(2)}</span>
                                                </li>
                                            </ul>
                                            <Link
                                              className="c-btn theme-btn"
                                              href="#"
                                              onClick={(e) => {
                                                  e.preventDefault();
                                                  setIsLoading(true);
                                                  purchase();
                                              }}
                                            >Purchase</Link>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </section>
            )}
        </>
    );
};

export default CartMainArea;
