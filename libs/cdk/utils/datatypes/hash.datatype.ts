export type Hash<valueType> = {
    [key in string | number]: valueType;
};
