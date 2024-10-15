import products_data from '@data/products-data';
import useGlobalContext from '@shared/hooks/use-context';
import useCart from '@shared/hooks/useCart';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const ShopGridTabOneProducts = () => {
    const { setModalData } = useGlobalContext()
    const { UseAddToCart, UseAddToWishlist } = useCart();
    return (
        <>
            {
                products_data.slice(72, 81).map((item) => (
                    <div className="col-xl-4 cl-lg-4 col-md-6" key={item.id}>
                        <div className="product-wrapper text-center mb-45">
                            <div className="product-img pos-rel">
                                <Link href={`/product-details/${item.id}`}>
                                    <Image className='primary-img' src={item.image} style={{ width: "100%", height: "auto" }} alt="image not found" />
                                    {item.imageTwo &&
                                        <Image className="secondary-img" src={item.imageTwo} style={{ width: "100%", height: "auto" }}
                                            alt="image not found" />
                                    }
                                </Link>
                                <div className="product-action">
                                    <button className="action-btn" onClick={() => UseAddToWishlist(item)}><i className="far fa-heart"></i></button>
                                    <button className="action-btn" onClick={() => UseAddToCart(item)}><i className="far fa-cart-plus"></i></button>
                                    <button className="action-btn" onClick={() => setModalData(item)} data-bs-toggle="modal"
                                        data-bs-target="#productModalId"><i className="far fa-eye"></i></button>
                                </div>
                            </div>
                            <div className="product-text">
                                <h5>{item.subTitle}</h5>
                                <h4><Link href={`/product-details/${item.id}`}>{item.title}</Link></h4>
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
