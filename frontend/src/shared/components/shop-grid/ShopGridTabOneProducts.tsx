import useGlobalContext from '@shared/hooks/use-context';
import useCart from '@shared/hooks/useCart';
import Image from 'next/image';
import React from 'react';
import { Product } from '@shared/interface';

const ShopGridTabOneProducts = ({ products }: { products: Product[] }) => {
    const { setModalData } = useGlobalContext()
    const { UseAddToCart, UseAddToWishlist } = useCart();
    return (
        <>
            {
                products.map((item) => (
                    <div className="col-xl-4 cl-lg-4 col-md-6" key={item.id}>
                        <div
                          className="product-wrapper text-center mb-45"
                          style={{ cursor: 'pointer' }} onClick={() => setModalData(item)} data-bs-toggle="modal"
                          data-bs-target="#productModalId"
                        >
                            <div
                              className="product-img pos-rel"
                              style={{ width: "374px", height: "414px" }}
                            >
                                <img
                                  className='primary-img'
                                  src={item.image}
                                  style={{
                                    width: "100%",
                                    height: 'auto',
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                  }}
                                  alt="image not found"
                                />
                                <div className="product-action">
                                    <button className="action-btn" onClick={() => UseAddToWishlist(item)}><i className="far fa-heart"></i></button>
                                    <button className="action-btn" onClick={() => UseAddToCart(item)}><i className="far fa-cart-plus"></i></button>
                                    <button className="action-btn" onClick={() => setModalData(item)} data-bs-toggle="modal"
                                        data-bs-target="#productModalId"><i className="far fa-eye"></i></button>
                                </div>
                            </div>
                            <div className="product-text">
                                <h5>{item.category}</h5>
                                <h4 style={{ cursor: 'pointer' }} onClick={() => setModalData(item)} data-bs-toggle="modal"
                                  data-bs-target="#productModalId">{item.title}</h4>
                                <span>${item.price}</span>
                            </div>
                        </div>
                    </div>
                ))
            }
        </>
    );
};

export default ShopGridTabOneProducts;
