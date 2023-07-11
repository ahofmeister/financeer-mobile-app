import * as React from 'react';
import {forwardRef, useCallback, useEffect, useMemo, useState} from 'react';
import {TextInput} from 'react-native';
import {addSignPrefixAndSuffix, formatAmount} from "transactions/TransactionUtils";

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
        prefix = '',
        suffix = '',
        precision = 2,
        maxValue,
        minValue,
        signPosition = 'afterPrefix',
        showPositiveSign,
        ...rest
    } = props;

    const [startingWithSign, setStartingWithSign] = useState();

    const noNegativeValues = typeof minValue === 'number' && minValue >= 0;
    const noPositiveValues = typeof maxValue === 'number' && maxValue <= 0;

    const formattedValue = useMemo(() => {
        return formatAmount(value, {
            separator,
            prefix,
            suffix,
            precision,
            delimiter,
            ignoreNegative: noNegativeValues,
            signPosition,
            showPositiveSign,
        });
    }, [
        value,
        separator,
        prefix,
        suffix,
        precision,
        delimiter,
        noNegativeValues,
        signPosition,
        showPositiveSign,
    ]);

    useEffect(() => {
        onChangeText && onChangeText(formattedValue);
    }, [formattedValue]); // eslint-disable-line react-hooks/exhaustive-deps

    const handleChangeText = useCallback(
        (text: string) => {
            let textWithoutPrefix = text;

            if (prefix) {
                textWithoutPrefix = text.replace(prefix, '');
                if (textWithoutPrefix === text) {
                    textWithoutPrefix = text.replace(prefix.slice(0, -1), '');
                }
            }

            let textWithoutPrefixAndSufix = textWithoutPrefix;
            if (suffix) {
                const suffixRegex = new RegExp(`${suffix}([^${suffix}]*)$`);
                textWithoutPrefixAndSufix = textWithoutPrefix.replace(suffixRegex, '');

                if (textWithoutPrefixAndSufix === textWithoutPrefix) {
                    textWithoutPrefixAndSufix = textWithoutPrefix.replace(suffix.slice(1), '');
                }
            }

            // Starting with a minus or plus sign
            if (/^(-|-0)$/.test(text) && !noNegativeValues) {
                setStartingWithSign('-');
                onChangeText &&
                onChangeText(
                    addSignPrefixAndSuffix(formattedValue, {
                        prefix,
                        suffix,
                        sign: '-',
                        signPosition,
                    })
                );
                return;
            } else if (/^(\+|\+0)$/.test(text) && !noPositiveValues) {
                setStartingWithSign('+');
                onChangeText &&
                onChangeText(
                    addSignPrefixAndSuffix(formattedValue, {
                        prefix,
                        suffix,
                        sign: '+',
                        signPosition,
                    })
                );
            } else {
                setStartingWithSign(undefined);
            }

            const isNegativeValue = textWithoutPrefixAndSufix.includes('-');

            const textNumericValue = textWithoutPrefixAndSufix.replace(/\D+/g, '');


            const numberValue = Number(textNumericValue) * (isNegativeValue ? -1 : 1);

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
            suffix,
            prefix,
            noNegativeValues,
            noPositiveValues,
            precision,
            maxValue,
            minValue,
            onChangeValue,
            onChangeText,
            formattedValue,
            signPosition,
        ]
    );

    const textInputValue = useMemo(() => {
        return startingWithSign
            ? addSignPrefixAndSuffix(formattedValue, {
                prefix,
                suffix,
                sign: startingWithSign,
                signPosition,
            })
            : formattedValue;
    }, [formattedValue, prefix, signPosition, startingWithSign, suffix]);

    const nextProps = useMemo(
        () => ({
            keyboardType: 'numeric',
            selection: suffix
                ? {start: Math.max(textInputValue.length - suffix.length, 0)}
                : props?.selection,
            ...rest,
            value: textInputValue,
            onChangeText: handleChangeText,
            ref: ref,
        }),
        [handleChangeText, props?.selection, ref, rest, suffix, textInputValue]
    );

    return <TextInput className={"text-white"} autoFocus={props?.autoFocus}
                      {...nextProps} />;
});
