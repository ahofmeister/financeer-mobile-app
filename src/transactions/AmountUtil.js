export const formatAmount = amount => round(amount / 100, 2);

const round = (value, fractionDigits = 1) => {

    return (Math.round(value * 100) / 100).toFixed(fractionDigits);

}