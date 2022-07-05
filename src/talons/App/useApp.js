import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";

export const useApp = () => {
    const params = useParams();
    const activeShipmentIdFromUrl = params.shipmentId;

    const [fetchedShipments, setFetchedShipments] = useState([]);
    const [filteredShipments, setFilteredShipments] = useState([]);
    const [fetchError, setFetchError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [mobileMenuActive, setMobileMenuActive] = useState(false);
    const [activeShipment, setActiveShipment] = useState(false);

    const fetchShipments = async () => {
        setFetchError("");
        setIsLoading(true);
        try {
            const response = await fetch(
                "https://bitbucket.org/hpstore/spacex-cargo-planner/raw/204125d74487b1423bbf0453f4dcb53a2161353b/shipments.json"
            );
            if (!response.ok) {
                throw new Error("Sorry something went wrong");
            }
            const data = await response.json();
            setIsLoading(false);
            setFetchedShipments(data);
        } catch (error) {
            setIsLoading(false);
            setFetchError(error.message);
        }
    };

    useEffect(() => {
        fetchShipments();
    }, []);

    useEffect(() => {
        const newFilteredShipments = fetchedShipments.filter((shipment) => {
            const lowerCaseShipmentName = shipment.name.toLowerCase();
            const lowerCaseSearchText = searchText.toLowerCase();
            return lowerCaseShipmentName.includes(lowerCaseSearchText);
        });
        setFilteredShipments(newFilteredShipments);
    }, [searchText, fetchedShipments]);

    const shipments = searchText ? filteredShipments : fetchedShipments;

    const getActiveShipment = useCallback(
        (activeShipmentIdFromUrl, fetchedShipments) => {
            let activeShipment;

            if (!activeShipmentIdFromUrl) {
                activeShipment = fetchedShipments[0];
            } else {
                activeShipment = fetchedShipments.find(
                    (shipment) => shipment.id === activeShipmentIdFromUrl
                );
            }

            return activeShipment;
        },
        []
    );

    useEffect(() => {
        const newActiveShipment = getActiveShipment(
            activeShipmentIdFromUrl,
            fetchedShipments
        );

        setActiveShipment(newActiveShipment);
    }, [activeShipmentIdFromUrl, fetchedShipments, getActiveShipment]);

    const toggleMobileMenu = useCallback(() => {
        setMobileMenuActive(!mobileMenuActive);
    }, [mobileMenuActive]);

    const closeMobileMenu = useCallback(() => {
        setMobileMenuActive(false);
    }, []);

    return {
        isLoading,
        shipments,
        fetchError,
        setSearchText,
        activeShipment,
        toggleMobileMenu,
        mobileMenuActive,
        closeMobileMenu,
        activeShipmentIdFromUrl,
    };
};
