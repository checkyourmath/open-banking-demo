"use client"

import React, { useEffect, useState } from 'react';
import ShopModal from '../common/modal/ShopModal';
import NiceSelect from '../common/NiceSelect';
import productSelectOptionData from '@data/product-select-option-data';
import ShopGridTabTwoProducts from './ShopGridTabTwoProducts';
import ShopGridTabOneProducts from './ShopGridTabOneProducts';
import products_data from '@data/products-data';
import { Product } from '@shared/interface';
import { getProducts } from '@shared/http/products.http';

const ShopProductArea = () => {
    const [ isLoading, setIsLoading ] = useState<boolean>(true);
    const [ products, setProducts ] = useState<Product[]>([]);
    const selectHandler = () => { };

    useEffect(() => {
        void loadProducts();
    }, []);

    const loadProducts = async () => {
        setIsLoading(true);
        setProducts(await getProducts());
        setIsLoading(false);
    }

    return (
        <>
            <div className="product-area pt-100 pb-50">
                <div className="container">
                    <div className="row mb-20">
                        <div className="col-xl-4 col-lg-3 col-md-3">
                            <div className="product-02-tab mb-20">
                                <ul className="nav nav-pills mb-3 justify-content-start product-nav" id="pills-tab"
                                  role="tablist">
                                    <li className="nav-item">
                                        <button className="nav-link active" id="pills-home-tab" data-bs-toggle="pill"
                                          data-bs-target="#pills-home" type="button" role="tab"
                                          aria-controls="pills-home" aria-selected="true">
                                            <i className="fa-solid fa-grid-2"></i>
                                        </button>
                                    </li>
                                    <li className="nav-item">
                                        <button className="nav-link" id="pills-profile-tab" data-bs-toggle="pill"
                                          data-bs-target="#pills-profile" type="button" role="tab"
                                          aria-controls="pills-profile" aria-selected="false">
                                            <i className="fas fa-bars"></i>
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-xl-4 col-lg-5 col-md-5">
                            <div className="pro-tab1-content pt-15 mb-20 text-md-center">
                                <h4>Showing 50 Products</h4>
                            </div>
                        </div>
                        <div className="col-xl-4 col-lg-4 col-md-4">
                            <div className="pro-filter mb-20 f-right">
                                <form action="#">
                                    <NiceSelect
                                      options={productSelectOptionData}
                                      defaultCurrent={0}
                                      onChange={selectHandler}
                                      name=""
                                      className=""
                                    />
                                </form>
                            </div>
                        </div>
                    </div>

                    <div className="product-tab-content">
                        <div className="tab-content" id="pills-tabContent">
                            <div className="tab-pane fade show active" id="pills-home" role="tabpanel"
                              aria-labelledby="pills-home-tab">
                                <div className="row">
                                    <ShopGridTabOneProducts
                                      products={products}
                                    />
                                </div>
                            </div>
                            <div className="tab-pane fade" id="pills-profile" role="tabpanel"
                              aria-labelledby="pills-profile-tab">
                                <ShopGridTabTwoProducts
                                  products={products}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ShopModal/>
        </>
    );
};

export default ShopProductArea;
