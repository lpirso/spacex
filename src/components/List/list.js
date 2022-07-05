import React, { useCallback } from "react";
import { NavLink } from "react-router-dom";

import { useWindowWidth } from "../../hooks/useWindowWidth";
import classes from "./list.module.css";

const List = ({ shipments, mobileMenuActive, closeMobileMenu }) => {
    const activeLinkClasses = classes.activeLink + " " + classes.link;
    const linkClasses = classes.link;
    const menuActiveClass = mobileMenuActive ? classes.menuActive : "";
    const { isMobile } = useWindowWidth();

    const handleClick = useCallback(() => {
        if (isMobile) {
            closeMobileMenu();
        }
    }, [isMobile, closeMobileMenu]);

    const listOfShipmentNames = shipments.map((shipment) => {
        return (
            <NavLink
                onClick={handleClick}
                to={shipment.id}
                key={shipment.id}
                className={({ isActive }) =>
                    isActive ? activeLinkClasses : linkClasses
                }
            >
                {shipment.name}
            </NavLink>
        );
    });

    const noResults = (
        <p className={classes.noResults}>There are no results!</p>
    );

    return (
        <nav className={classes.root + " " + menuActiveClass}>
            <h2>Shipment list</h2>
            {shipments.length ? listOfShipmentNames : noResults}
        </nav>
    );
};

export default List;
