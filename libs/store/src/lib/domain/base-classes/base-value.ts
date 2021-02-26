export abstract class BaseValue<T> {
    protected readonly props: T;

    constructor(props: T) {
        this.props = Object.freeze(props);
    }

    clone() {
        const propsCopy = { ...this.props };
        return Object.freeze(propsCopy);
    }

    /**
     *  Check if two Value Objects are equal. Checks structural equality.
     * @param vo ValueObject
     */
    public equals(vo?: BaseValue<T>): boolean {
        if (vo === null || vo === undefined) {
            return false;
        }
        return JSON.stringify(this) === JSON.stringify(vo);
    }
}
