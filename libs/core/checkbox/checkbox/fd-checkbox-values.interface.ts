export interface FdCheckboxValues {
    trueValue?: any;
    falseValue?: any;
    thirdStateValue?: any;
}

export const FD_CHECKBOX_VALUES_DEFAULT: Readonly<FdCheckboxValues> = {
    trueValue: true,
    falseValue: false,
    thirdStateValue: null
};
