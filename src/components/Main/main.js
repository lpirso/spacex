import React from "react";

import { useMain } from "../../talons/Main/useMain";
import classes from "./main.module.css";

const Main = ({ activeShipment }) => {
    const {
        name,
        email,
        cargoBoxesInputText,
        setCargoBoxesInputText,
        numberOfRequiedBays,
        isInputValid,
    } = useMain({ activeShipment });

    return (
        <div className={classes.root}>
            <h1>{name}</h1>
            <a className={classes.email} href={`mailto:${email}`}>
                {email}
            </a>
            <h4>Cargo boxes</h4>
            <div>
                <input
                    value={cargoBoxesInputText}
                    onChange={(event) => {
                        setCargoBoxesInputText(event.target.value);
                    }}
                />
                {!isInputValid ? <p>Input invalid!</p> : null}
            </div>
            <h3>Number of required cargo bays</h3>
            <div className={classes.baysNumber}>{numberOfRequiedBays}</div>
        </div>
    );
};

export default Main;
