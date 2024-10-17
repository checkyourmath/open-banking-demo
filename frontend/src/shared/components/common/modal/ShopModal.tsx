"use client"
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import productTwo from "@public/assets/img/products/04.png";
import productThere from "@public/assets/img/products/05.png";
import productFour from "@public/assets/img/products/06.png";
import { useSelector } from 'react-redux';
import { RootState } from '@shared/redux/store';
import useGlobalContext from '@shared/hooks/use-context';
import { Product } from '@shared/interface';
import { useDispatch } from 'react-redux';
import { cart_product, decrease_quantity } from '@shared/redux/slices/cartSlice';

const ShopModal = () => {
    const { modalData } = useGlobalContext()
    const dispatch = useDispatch()
    const cartProducts = useSelector(
        (state: RootState) => state.cart.cartProducts
    );
    const myData = cartProducts.find((item) => item.id === modalData.id);
    const handleAddToCart = (product: Product) => {
        dispatch(cart_product(product))
    }
    const handleDecressCart = (product: Product) => {
        dispatch(decrease_quantity(product))
    }

    return (
        <>
            <div className="modal fade" id="productModalId" tabIndex={-1} role="dialog" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered product__modal" role="document">
                    <div className="modal-content">
                        <div className="product__modal-wrapper p-relative">
                            <div className="product__modal-close p-absolute">
                                <button data-bs-dismiss="modal"><i className="fal fa-times"></i></button>
                            </div>
                            <div className="product__modal-inner">
                                <div className="row">
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                        {/* modal box */}
                                        <div className="product__modal-box">
                                            <div className="tab-content" id="modalTabContent">
                                                <div className="tab-pane fade show active" id="nav1" role="tabpanel"
                                                    aria-labelledby="nav1-tab">
                                                    <div className="product__modal-img w-img">
                                                        {modalData?.image && <Image width={0} height={0} src={modalData?.image} style={{ width: "auto", height: "auto" }} alt="product" />}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                        {/* modal content */}
                                        <div className="product__modal-content">
                                            <h4><Link href={`/shop-details/${modalData?.id}`}>{modalData?.title}</Link></h4>
                                            <div className="product__modal-des mb-40">
                                                <p>{modalData?.description}
                                                </p>
                                            </div>
                                            <div className="product__stock">
                                                <span>Availability :</span>
                                                <span>In Stock</span>
                                            </div>
                                            <div className="product__stock sku mb-30">
                                                <span>SKU:</span>
                                                <span>Juicera C49J89: £875, Debenhams Plus</span>
                                            </div>
                                            <div className="product__price">
                                                <span>${modalData?.price}</span>
                                            </div>
                                            <div className="product__modal-form">
                                                <div className="product-quantity-cart mb-30">
                                                    <div className="product-quantity-form">
                                                        <form onSubmit={(e) => e.preventDefault()}>
                                                            <button className="cart-minus" onClick={() => handleDecressCart(modalData)}>
                                                                <i className="far fa-minus"></i>
                                                            </button>
                                                            <input className="cart-input m-0" readOnly value={myData?.quantity || 0} />
                                                            <button className="cart-plus" onClick={() => handleAddToCart(modalData)}>
                                                                <i className="far fa-plus"></i>
                                                            </button>
                                                        </form>
                                                    </div>
                                                    <div data-bs-dismiss="modal">
                                                        <Link href="/cart" className="medi-productAdd-btn" data-bs-dismiss="modal">
                                                            View Cart
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="product__modal-links">
                                                <ul>
                                                    <li data-bs-dismiss="modal"><Link href="#" title="Add to Wishlist"><i className="fal fa-heart"></i></Link></li>
                                                    <li><Link href="#" title="Compare"><i className="far fa-sliders-h"></i></Link></li>
                                                    <li><Link href="#" title="Print"><i className="fal fa-print"></i></Link></li>
                                                    <li><Link href="#" title="Share"><i className="fal fa-share-alt"></i></Link></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ShopModal;
