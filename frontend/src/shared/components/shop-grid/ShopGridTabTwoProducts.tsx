import products_data from '@data/products-data';
import useGlobalContext from '@shared/hooks/use-context';
import useCart from '@shared/hooks/useCart';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const ShopGridTabTwoProducts = () => {
    const { setModalData } = useGlobalContext()
    const { UseAddToCart, UseAddToWishlist } = useCart();
    return (
        <>
            {
                products_data.slice(81, 87).map((item) => (
                    <div className="row" key={item.id}>
                        <div className="col-xl-4 col-lg-4">
                            <div className="product mb-30">
                                <div className="product-img">
                                    <Link href={`/product-details/${item.id}`}>
                                        <Image src={item.image} style={{ width: "100%", height: "auto" }} alt="image not found" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-8 col-lg-8">
                            <div className="product-list-content mb-30">
                                <div className="product-text">
                                    <h5>{item.subTitle}</h5>
                                    <h4><Link href={`/product-details/${item.id}`}>{item.title}</Link></h4>
                                    <span>${item.price}</span>
                                </div>
                                <p>{item.desc}</p>
                                <div className="product-action product-02-action">
                                    <button className="action-btn" onClick={() => UseAddToWishlist(item)}><i className="far fa-heart"></i></button>
                                    <button className="action-btn" onClick={() => UseAddToCart(item)} ><i className="far fa-cart-plus"></i></button>
                                    <button className="action-btn" onClick={() => setModalData(item)} data-bs-toggle="modal"
                                        data-bs-target="#productModalId"><i className="far fa-eye"></i></button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            }
        </>
    );
};

export default ShopGridTabTwoProducts;
