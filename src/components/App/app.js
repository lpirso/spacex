import React from "react";

import { useApp } from "../../talons/App/useApp";

import Header from "../Header";
import List from "../List";
import Main from "../Main";
import classes from "./app.module.css";

const App = () => {
    const {
        isLoading,
        shipments,
        fetchError,
        setSearchText,
        activeShipment,
        toggleMobileMenu,
        mobileMenuActive,
        closeMobileMenu,
        activeShipmentIdFromUrl,
    } = useApp();

    if (isLoading || fetchError) return null;

    return (
        <div className={classes.root}>
            <Header
                toggleMobileMenu={toggleMobileMenu}
                mobileMenuActive={mobileMenuActive}
                setSearchText={setSearchText}
            />
            <List
                shipments={shipments}
                mobileMenuActive={mobileMenuActive}
                closeMobileMenu={closeMobileMenu}
            />
            {activeShipment ? (
                <Main activeShipment={activeShipment} />
            ) : (
                <div className={classes.nonExistantShipment}>
                    <p>{`Shipment with id ${activeShipmentIdFromUrl} doesn't exist!`}</p>
                </div>
            )}
        </div>
    );
};

export default App;
