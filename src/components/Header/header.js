import React from "react";

import { useWindowWidth } from "../../hooks/useWindowWidth";
import Logo from "./Logo";
import Search from "./Search";
import MobileMenuTrigger from "./MobileMenuTrigger";
import classes from "./header.module.css";

const Header = ({ setSearchText, mobileMenuActive, toggleMobileMenu }) => {
    const { isMobile } = useWindowWidth();

    return (
        <header className={classes.root}>
            <Logo />
            {isMobile ? (
                <MobileMenuTrigger
                    mobileMenuActive={mobileMenuActive}
                    toggleMobileMenu={toggleMobileMenu}
                />
            ) : null}
            <Search
                mobileMenuActive={mobileMenuActive}
                setSearchText={setSearchText}
            />
        </header>
    );
};

export default Header;
