import * as React from 'react';
import {useEffect, useRef, useState} from "react";

export default (blinkProps) => {
    const {blinkRate = 500} = blinkProps || {};

    const [visible, setVisible] = useState(true);

    const interval = useRef();

    useEffect(() => {
        interval.current = setInterval(() => {
            setVisible((prevVisible) => !prevVisible);
        }, blinkRate);

        return () => {
            interval.current && clearInterval(interval.current);
        };
    }, [blinkRate]);

    return visible;
};
