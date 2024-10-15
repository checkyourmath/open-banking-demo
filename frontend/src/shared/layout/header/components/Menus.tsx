"use client"
import menu_data from '@data/menu-data';
import Link from 'next/link';
import React, { useState } from 'react';

const Menus = () => {
    const [submenuOpen, setSubmenuOpen] = useState<number>(0);
    const [open, setOpen] = useState<boolean>(false);

    return (
        <>
            {menu_data?.length &&
                menu_data?.map((item) => (
                    <li
                        key={item.id}
                        className={`${item.hasDropdown && submenuOpen === item.id && open === true
                            ? "menu-item-has-children has-droupdown active"
                            : `${item.hasDropdown
                                ? "menu-item-has-children has-droupdown"
                                : ""
                            }`
                            }`}
                    >
                        <Link href={item.link}>
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
                                            <Link href={data.link}> {data.title} </Link>
                                        </li>
                                    ))}
                            </ul>
                        )}
                    </li>
                ))}
        </>
    );
};

export default Menus;
