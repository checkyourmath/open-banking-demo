import Link from 'next/link';
import React from 'react';
import SocialIcon from '../social-icon/SocialIcon';
import Image from 'next/image';
import FooterImg from '@public/assets/img/footer/footer.png';
import { usePathname } from 'next/navigation';

const FooterOne = () => {
    const pathname = usePathname()
    return (
        <footer>
            <div className={`footer-area pt-80 pb-45 
            ${pathname === "/terms-condition"
                    || pathname === "/privacy-policy"
                    || pathname === "/404-page" ?
                    "footer-bg" : ""}`}>
                <div className="container">
                    <div className="row">
                        <div className="col-xl-3 col-lg-3 col-md-6">
                            <div className="footer-wrapper mb-30">
                                <h3 className="footer-title">About Company</h3>
                                <div className="footer-text">
                                    <p>But must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born </p>
                                </div>
                                <SocialIcon WrapperClass="footer-icon" />
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-3 col-md-6">
                            <div className="footer-wrapper ml-80 mb-30">
                                <h3 className="footer-title">Useful Links</h3>
                                <div className="footer-link">
                                    <ul>
                                        <li><Link href="/my-account">Shipping Options</Link></li>
                                        <li><Link href="/wishlist">My Wishlist</Link></li>
                                        <li><Link href="/my-account">My Account</Link></li>
                                        <li><Link href="/refund-policy">Return Policy</Link></li>
                                        <li><Link href="/faq">Shopping FAQs</Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-3 col-md-6">
                            <div className="footer-wrapper ml-80 mb-30">
                                <h3 className="footer-title">Product</h3>
                                <div className="footer-link">
                                    <ul>
                                        <li><Link href="/">Product One</Link></li>
                                        <li><Link href="/">Product Two</Link></li>
                                        <li><Link href="/">Product Three</Link></li>
                                        <li><Link href="/">Product Four</Link></li>
                                        <li><Link href="/my-account">Shipping & Returns</Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-3 col-md-6">
                            <div className="footer-wrapper ml-130 mb-30">
                                <h3 className="footer-title">Payment</h3>
                                <div className="footer-img">
                                    <Image src={FooterImg} style={{ width: "auto", height: "auto" }} alt="image not found" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer-bottom-area mr-70 ml-70 pt-25 pb-25">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-6 col-lg-6 col-md-6">
                            <div className="copyright">
                                <p>Copyright <i className="far fa-copyright"></i> 2024 <Link href="#">Generic Company</Link>. All Rights Reserved</p>
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-6">
                            <div className="footer-bottom-link f-right">
                                <ul>
                                    <li><Link href="/">Home </Link></li>
                                    <li><Link href="/about"> About Us</Link></li>
                                    <li><Link href="/contact">Contact</Link></li>
                                    <li><Link href="/">Our Product</Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default FooterOne;
