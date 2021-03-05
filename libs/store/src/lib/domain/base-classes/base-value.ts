export abstract class BaseValue<T> {
    readonly dto: T;

    constructor(dto: T) {
        this.dto = Object.freeze(dto);
    }

    clone() {
        const copyValue = { ...this.dto };
        return Object.freeze(copyValue);
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
