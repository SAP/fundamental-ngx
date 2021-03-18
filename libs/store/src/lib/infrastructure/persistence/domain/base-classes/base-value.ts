import { Composite } from './composite';

export abstract class BaseValue<T> extends Composite<T>{
    dto: T;

    protected constructor(dto: T) {
        super();
        this.dto = Object.freeze(dto);
    }

    clone() {
        const copyValue = { ...this.dto };
        return copyValue;
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
