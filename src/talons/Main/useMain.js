import { useState, useCallback, useEffect } from "react";

export const useMain = ({ activeShipment }) => {
    const { name, email, boxes } = activeShipment;

    useEffect(() => {
        if (!boxes) return;
        setCargoBoxesInputText(boxes);
    }, [boxes]);

    const [cargoBoxesInputText, setCargoBoxesInputText] = useState(boxes || "");
    const [numberOfRequiedBays, setNumberOfRequiedBays] = useState("");
    const [isInputValid, setIsInputValid] = useState(true);

    const getUnits = (cargoBoxesInputText) => {
        const cargoBoxes = cargoBoxesInputText.split(",");
        const units = cargoBoxes.map((unit) => {
            return Number(unit);
        });
        return units;
    };

    useEffect(() => {
        const regex = new RegExp(/\d{1,3}(,\d{3})*(\.\d\d)?|\.\d\d/);
        setIsInputValid(regex.test(cargoBoxesInputText));
    }, [cargoBoxesInputText]);

    const organizeCargo = useCallback((cargoBoxesInputText) => {
        const units = getUnits(cargoBoxesInputText);
        units.sort(function (a, b) {
            return a - b;
        });

        return units;
    }, []);

    const fitBoxIntoBay = useCallback(
        (bay, firstIndex, lastIndex, sum, boxes) => {
            if (sum + boxes[firstIndex] <= 10 && firstIndex < lastIndex) {
                bay.push(boxes[firstIndex]);
                sum = sum + boxes[firstIndex];
                [bay, firstIndex] = fitBoxIntoBay(
                    bay,
                    firstIndex + 1,
                    lastIndex,
                    sum,
                    boxes
                );
            }

            return [bay, firstIndex];
        },
        []
    );

    const calculateNumberOfRequiredBays = useCallback(
        (boxes) => {
            let bays = [];
            let firstIndex = 0;
            let lastIndex = boxes.length - 1;

            if (boxes.length === 1) {
                setNumberOfRequiedBays(1);
            }

            while (firstIndex < lastIndex) {
                let bay = [boxes[lastIndex]];
                let sum = boxes[lastIndex];
                [bay, firstIndex] = fitBoxIntoBay(
                    bay,
                    firstIndex,
                    lastIndex,
                    sum,
                    boxes
                );
                bays.push(bay);
                lastIndex--;
            }

            setNumberOfRequiedBays(bays.length);
        },
        [fitBoxIntoBay]
    );

    useEffect(() => {
        if (!cargoBoxesInputText || !isInputValid) return;

        const organizedCargoBoxes = organizeCargo(cargoBoxesInputText);
        calculateNumberOfRequiredBays(organizedCargoBoxes);
    }, [
        cargoBoxesInputText,
        calculateNumberOfRequiredBays,
        organizeCargo,
        isInputValid,
    ]);

    return {
        name,
        email,
        cargoBoxesInputText,
        setCargoBoxesInputText,
        numberOfRequiedBays,
        isInputValid,
    };
};
