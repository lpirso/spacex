import React from "react";

import logo from "./logo.svg";
import classes from "./logo.module.css";

const Logo = () => {
    return <img className={classes.root} alt="Logo" src={logo} />;
};

export default Logo;
