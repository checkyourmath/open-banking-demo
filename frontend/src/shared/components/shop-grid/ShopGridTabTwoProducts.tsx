import useGlobalContext from '@shared/hooks/use-context';
import useCart from '@shared/hooks/useCart';
import Image from 'next/image';
import React from 'react';
import { Product } from '@shared/interface';

const ShopGridTabTwoProducts = ({ products }: { products: Product[] }) => {
    const { setModalData } = useGlobalContext()
    const { UseAddToCart } = useCart();
    return (
        <>
            {
                products.map((item) => (
                    <div className="row" key={item.id}>
                        <div className="col-xl-4 col-lg-4">
                            <div className="product mb-30">
                                <div className="product-img pos-rel" style={{ width: "374px", height: "414px" }}>
                                    <Image
                                      src={item.image}
                                      width={0}
                                      height={0}
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
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-8 col-lg-8">
                            <div className="product-list-content mb-30">
                                <div className="product-text">
                                    <h5>{item.category}</h5>
                                    <h4>{item.title}</h4>
                                    <span>${item.price}</span>
                                </div>
                                <p>{item.description}</p>
                                <div className="product-action product-02-action">
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
