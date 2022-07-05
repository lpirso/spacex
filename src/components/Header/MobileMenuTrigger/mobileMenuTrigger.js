import React from "react";

import classes from "./mobileMenuTrigger.module.css";

const MobileMenuTrigger = ({ mobileMenuActive, toggleMobileMenu }) => {
    const activeClass = mobileMenuActive ? classes.active : "";

    return (
        <button
            onClick={toggleMobileMenu}
            type="button"
            className={classes.root}
        >
            <div className={classes.stripe1 + " " + activeClass}></div>
            <div className={classes.stripe2 + " " + activeClass}></div>
            <div className={classes.stripe3 + " " + activeClass}></div>
        </button>
    );
};

export default MobileMenuTrigger;
