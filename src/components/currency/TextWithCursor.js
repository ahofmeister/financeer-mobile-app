import * as React from 'react';
import {StyleSheet, Text, TextInput} from 'react-native';
import useBlink from "components/currency/useBlink";
import FinanceerText from "components/FinanceerText";
import {useEffect, useMemo, useRef, useState} from "react";


const TextWithCursor = (textWithCursorProps) => {
    const { children, cursorVisible, style, cursorProps, ...rest } = textWithCursorProps;

    const blinkVisible = useBlink();

    const [isTyping, setIsTyping] = useState(false);

    const timeout = useRef();

    const cursorVisibility = useMemo(() => {
        return cursorVisible && (blinkVisible || isTyping);
    }, [blinkVisible, cursorVisible, isTyping]);

    useEffect(() => {
        setIsTyping(true);
        timeout.current = setTimeout(() => {
            setIsTyping(false);
        }, 500);

        return () => {
            timeout.current && clearTimeout(timeout.current);
        };
    }, [children]);

    return (
        <TextInput {...rest} className={textWithCursorProps?.inputClassName}>
            {children}
            <FinanceerText className={"text-primary"}
                {...cursorProps}
                style={[
                    styles.cursor,
                    cursorProps?.style,
                    !cursorVisibility ? styles.cursorHidden : undefined,
                ]}
            >
                |
            </FinanceerText>
        </TextInput>
    );
};

const styles = StyleSheet.create({
    cursorHidden: {
        color: 'transparent',
    },
});

export default TextWithCursor;
