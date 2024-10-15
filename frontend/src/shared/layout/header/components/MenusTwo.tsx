"use client"
import menu_data from '@data/menu-data';
import useGlobalContext from '@shared/hooks/use-context';
import Link from 'next/link';
import React, { useState } from 'react';

const MenusTwo = () => {
    const [submenuOpen, setSubmenuOpen] = useState<number>(0);
    const [open, setOpen] = useState<boolean>(false);
    const { setSideMenuOpen, sideMenuOpen, toggleSideMenu } = useGlobalContext()

    const handleMenuToggle = (item: any) => {
        setSubmenuOpen(item.id);
        setOpen(!open);
        if (item.hasDropdown === false) {
            setSideMenuOpen(!sideMenuOpen);
        }

    };
    return (
        <>
            {menu_data?.length &&
                menu_data?.map((item) => (
                    <li
                        onClick={() => handleMenuToggle(item)}
                        key={item.id}
                        className={`${item.hasDropdown && submenuOpen === item.id && open === true
                            ? "menu-item-has-children has-droupdown active"
                            : `${item.hasDropdown
                                ? "menu-item-has-children has-droupdown"
                                : ""
                            }`
                            }`}
                    >
                        <Link onClick={() => !item?.hasDropdown && toggleSideMenu()} href={item.link}>
                            {item.title}
                        </Link>

                        {item.hasDropdown === true && (
                            <ul
                                className={
                                    item.submenus && submenuOpen === item.id && open === true
                                        ? "sub-menu text-left active"
                                        : "sub-menu"
                                }
                            >
                                {item?.submenus?.length &&
                                    item?.submenus.map((data, index) => (
                                        <li key={index}>
                                            <Link onClick={toggleSideMenu} href={data.link}> {data.title} </Link>
                                        </li>
                                    ))}
                            </ul>
                        )}
                    </li>
                ))}
        </>
    );
};

export default MenusTwo;
