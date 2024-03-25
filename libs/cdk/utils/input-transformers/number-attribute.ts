/**
 * Transforms a string or number into a number.
 * @param value
 */
export function numberAttribute<AcceptableInputs, ReturnType extends number = number>(
    value: AcceptableInputs
): ReturnType {
    return parseInt(value + '', 10) as ReturnType;
}
