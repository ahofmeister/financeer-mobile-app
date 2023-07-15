import * as React from 'react';
import {forwardRef, useCallback, useEffect, useMemo} from 'react';
import {TextInput} from 'react-native';
import {formatAmount} from "transactions/TransactionUtils";

export const CurrencyInput = forwardRef((
    props,
    ref
) => {
    const {
        renderTextInput,
        value,
        onChangeText,
        onChangeValue,
        separator,
        delimiter,
        precision = 2,
        maxValue,
        minValue,
        ...rest
    } = props;

    const formattedValue = useMemo(() => {
        return formatAmount(value, {
            separator,
            precision,
            delimiter,
        });
    }, [
        value,
        separator,
        precision,
        delimiter
    ])

    useEffect(() => {
        onChangeText && onChangeText(formattedValue);
    }, [formattedValue]); // eslint-disable-line react-hooks/exhaustive-deps

    const handleChangeText = useCallback(
        (text: string) => {

            onChangeText(formattedValue)

            const textNumericValue = text.replace(/\D+/g, '');


            const numberValue = Number(textNumericValue)

            const zerosOnValue = textNumericValue.replace(/[^0]/g, '').length;

            let newValue: number | null;

            if (!textNumericValue || (!numberValue && zerosOnValue === precision)) {
                newValue = 0;
            } else {
                newValue = numberValue
            }

            if (newValue && maxValue && newValue > maxValue) {
                return;
            } else if (newValue && minValue && newValue < minValue) {
                return;
            }

            onChangeValue && onChangeValue(newValue);
        },
        [
            precision,
            maxValue,
            minValue,
            onChangeValue,
            onChangeText,
            formattedValue
        ]
    );

    const textInputValue = useMemo(() => formattedValue, [formattedValue]);

    const nextProps = useMemo(
        () => ({
            keyboardType: 'numeric',
            selection: props?.selection,
            ...rest,
            value: textInputValue,
            onChangeText: handleChangeText,
            ref: ref,
        }),
        [handleChangeText, props?.selection, ref, rest, textInputValue]
    );

    return <TextInput className={"text-white"} autoFocus={props?.autoFocus}
                      {...nextProps} />;
});
