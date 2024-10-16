import { StaticImageData } from 'next/image';
import React from 'react';

export type ApiResponse<T> = {
  isSuccess: boolean;
  data: T;
  errors?: { message: string; code: number; }[];
};


export type CreateOrderDto = {
  items: {
    productId: string;
    quantity: number;
  }[]
};

export type AcceptPayment = {
  authorizationUrl: string;
  paymentId: string;
};

export type Order = {
  id: string;
  price: number;
  paymentId: string;
  paymentLink: string;
}

export enum PaymentStatus {
  Requested = 'Requested',
  Authorized = 'Authorized',
  Cancelled = 'Cancelled',
  Initiated = 'Initiated',
}

export type QueryParams = Record<string, string | string[]>;

export type Payment = {
  id: string;
  amount: number;
  status: PaymentStatus;
  createdAt: string;
  lastUpdated: string;
  details: {
    reason: string;
    description: string;
    messageToPayer: string;
  };
}

// context api data type
export interface AppContextType {
  scrollDirection?: string;
  setScrollDirection?: React.Dispatch<React.SetStateAction<string>> | undefined;
  toggleSideMenu: () => void;
  filterType: string;
  sideMenuOpen: boolean;
  setSideMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setFilterType: React.Dispatch<React.SetStateAction<string>>;
  setModalData: any;
  modalData: any
}

//banner-data-type
export interface BannerDataType {
  id: number,
  image: StaticImageData;
  title: string,
  subTitle: string,
  wrapperClass?: string;
  bannerBtn: string;
  bannerTag?: string;
  desc?: string;

}
// product type
export interface Product {
  id: string;
  image: string;
  title: string;
  category: string;
  description?: string;
  price: number;
  quantity: number;
  // oldPrice?: number;
  // bannerTag?: string;
  // bgClass?: string;
  // desc?: string;
  // totalCard?: number;
  // rating?: number
}
//counter type
export interface CounterType {
  id: number,
  counterNum: number,
  text: string,
  icon?: string
}

//testimonial type
export interface testimonialType {
  id: number;
  image: StaticImageData;
  rating?: number;
  desc: string;
  title: string;
  info: string;
  text?: string;
}
//blog data type
export interface BlogDataType {
  id: number;
  image: StaticImageData;
  blogTag: string;
  tagClass: string;
  date: string;
  title: string;
  desc: string
}
// menu-data type
export interface MenuType {
  id: number;
  hasDropdown?: boolean;
  active?: boolean;
  title: string;
  pluseIncon?: boolean;
  link: string;
  submenus?: any[];
  pages?: boolean;
}
//hero slider data
export interface HeroDataType {
  id: number;
  image: StaticImageData,
  imageTwo?: StaticImageData,
  title: string,
  info: string,
  price?: number,
  desc: string
}
//product select option-type
export type SelcetType = {
  id: number,
  option: string
}
// id type
export interface idType {
  id?: number;
}
export interface CountryType {
  id: number,
  option: string
}
//team data type
interface ISocial {
  id: number;
  socialLink: string;
  icon: string
}
export interface TeamDataType {
  id: number;
  title: string;
  image: StaticImageData,
  info: string,
  socialIcon: ISocial[]
}
//comment data type
export interface CommentType {
  _id: string;
  date: string;
  comment: string;
  email: string;
  name: string;
  postId: string;
  img: string | StaticImageData;
  title: string;
}
export interface UserReviewType {
  _id: string;
  productName: string;
  review: string;
  name: string;
  email: string;
  date: string;
  productId: string;
  categoryName: string;
  rating: number;
  img?: string | StaticImageData;
}














