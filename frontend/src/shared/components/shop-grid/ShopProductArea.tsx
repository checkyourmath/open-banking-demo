"use client"
import React from 'react';
import ShopModal from '../common/modal/ShopModal';
import PaginationData from '../../components/common/pagination/pagination-data'
import NiceSelect from '../common/NiceSelect';
import productSelectOptionData from '@data/product-select-option-data';
import ShopGridTabTwoProducts from './ShopGridTabTwoProducts';
import ShopGridTabOneProducts from './ShopGridTabOneProducts';

const ShopProductArea = () => {
    const selectHandler = () => { }

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
                                <h4>Showing 20 Results Of 50 Products</h4>
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

                    <div className="row mb-40">
                        <div className="col-xl-12">
                            <div className="basic-pagination mt-20 basic-pagination-2 text-center">
                                <PaginationData/>
                            </div>
                        </div>
                    </div>

                    <div className="product-tab-content">
                        <div className="tab-content" id="pills-tabContent">
                            <div className="tab-pane fade show active" id="pills-home" role="tabpanel"
                              aria-labelledby="pills-home-tab">
                                <div className="row">
                                    <ShopGridTabOneProducts/>
                                </div>
                            </div>
                            <div className="tab-pane fade" id="pills-profile" role="tabpanel"
                              aria-labelledby="pills-profile-tab">
                                <ShopGridTabTwoProducts/>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-xl-12">
                            <div className="basic-pagination mt-20 basic-pagination-2 text-center">
                                <PaginationData/>
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
