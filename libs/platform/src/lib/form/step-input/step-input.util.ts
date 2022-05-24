export const addAndCutFloatingNumberDistortion = (value: number | null, step: number): number => {
    value = value || 0;
    const stepDecimals = `${step}`.split('.')[1];
    const valueDecimals = `${value}`.split('.')[1];
    const stepDecimalsLength = stepDecimals ? stepDecimals.length : 0;
    const valueDecimalsLength = valueDecimals ? valueDecimals.length : 0;
    const longestDecimal = Math.max(valueDecimalsLength, stepDecimalsLength);

    return Number((value + step).toFixed(longestDecimal));
};

export const getNumberDecimalLength = (value: number): number => {
    const numberStr = (value || 0).toString();
    return (numberStr.split('.')[0] || '').length;
};
