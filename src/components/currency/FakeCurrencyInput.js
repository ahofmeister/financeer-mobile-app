import * as React from 'react';
import {forwardRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';

import {CurrencyInput} from './CurrencyInput';
import TextWithCursor from './TextWithCursor';

const FakeCurrencyInput = forwardRef(
    (props, ref) => {
        const {
            value,
            style,
            onChangeText,
            containerStyle,
            caretHidden,
            caretColor,
            selectionColor,
            onFocus,
            onBlur,
            ...rest
        } = props;

        const [focused, setFocused] = useState(false);
        const [formattedValue, setFormattedValue] = useState();

        return (
            <View className={"relative"}>
                <TextWithCursor inputClassName={"text-white " + rest.inputClassName}
                                style={style}
                                cursorVisible={focused && !caretHidden}
                                cursorProps={{style: {color: caretColor || selectionColor}}}
                >
                    {formattedValue}
                </TextWithCursor>
                <CurrencyInput minValue={0}
                    value={value}
                    onChangeText={(text) => {
                        setFormattedValue(text);
                        onChangeText && onChangeText(text);
                    }}
                    {...rest}
                    selectionColor="transparent"
                    caretHidden
                    onFocus={(e) => {
                        setFocused(true);
                        onFocus && onFocus(e);
                    }}
                    onBlur={(e) => {
                        setFocused(false);
                        onBlur && onBlur(e);
                    }}
                    style={styles.inputHidden}
                    ref={ref}
                />
            </View>
        );
    }
);

const styles = StyleSheet.create({
    inputHidden: {
        color: 'transparent',
        position: 'absolute',
        top: 0,
        left: -20,
        right: 0,
        bottom: 0,
        fontSize: 1,
    },
});

export default FakeCurrencyInput;
