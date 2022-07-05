import React from "react";

import icon from "./icon.svg";
import classes from "./search.module.css";

const Search = ({ setSearchText, mobileMenuActive }) => {
    const activeClass = mobileMenuActive ? classes.active : "";

    return (
        <div className={classes.root + " " + activeClass}>
            <div className={classes.container}>
                <img className={classes.icon} alt="Search icon" src={icon} />
                <input
                    onChange={(event) => setSearchText(event.target.value)}
                    placeholder="Search"
                    className={classes.input}
                    type="text"
                />
            </div>
        </div>
    );
};

export default Search;
