export const formatAmount = (input, options) => {
    input = input / 100
    const {
        precision = 2,
        separator = ',',
        delimiter = '.',
    } = options || {};


    let string = Math.abs(input).toFixed(precision);

    if (input === 0) {
        string = '0'
    }

    const parts = string.split('.');
    const buffer = [];

    let number = parts[0];
    while (number.length > 0) {
        buffer.unshift(number.substr(Math.max(0, number.length - 3), 3));
        number = number.substr(0, number.length - 3);
    }

    let formattedNumber = buffer.join(delimiter);

    const decimals = parts[1];
    if (!!precision && decimals) {
        formattedNumber += separator + decimals;
    }

    return formattedNumber
}

export const calculateSum = (transactions) => transactions.reduce((partialSum, transaction) => partialSum + transaction.amount, 0)
