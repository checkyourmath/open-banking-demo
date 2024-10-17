import { MenuType } from "@shared/interface";

const menu_data: MenuType[] = [
    {
        id: 1,
        hasDropdown: false,
        active: true,
        title: "Home",
        pluseIncon: true,
        link: "/",
    },
    {
        id: 2,
        hasDropdown: true,
        active: true,
        title: "Shop",
        pluseIncon: true,
        link: "/",
        submenus: [
            { title: "Category One", link: "/" },
            { title: "Category Two", link: "/" },
            { title: "Category Three", link: "/" },
            { title: "Category Four", link: "/" },
            { title: "Category Five", link: "/" },
            { title: "Wishlist", link: "/wishlist" },
            { title: "Cart", link: "/cart" },
            { title: "Login", link: "/login" },
            { title: "Register", link: "/register" },
        ],
    },
    {
        id: 3,
        hasDropdown: true,
        active: true,
        title: "Team",
        pluseIncon: true,
        link: "#",
        submenus: [
            { title: "Team", link: "/team" },
            { title: "Team-details", link: "/team-details" }
        ],
    },
    {
        id: 4,
        hasDropdown: false,
        active: true,
        title: "Blog",
        pluseIncon: true,
        link: "/blog",
    },
    {
        id: 5,
        hasDropdown: true,
        active: true,
        title: "Pages",
        pluseIncon: true,
        link: "#",
        submenus: [
            { title: "My Account", link: "/my-account" },
            { title: "About", link: "/about" },
            { title: "Terms & Condition", link: "/terms-condition" },
            { title: "Privacy & Policy", link: "/privacy-policy" },
            { title: "Refund Policy", link: "/refund-policy" },
            { title: "Faq", link: "/faq" },
        ],
    },
    {
        id: 6,
        hasDropdown: false,
        active: true,
        title: "Contact",
        link: "/contact",
    },
]

export default menu_data;
