import { Composite } from './composite';

export abstract class BaseValue<T> extends Composite<T>{
    readonly dto: T;

    protected constructor(dto: T) {
        super();
        this.dto = Object.freeze(dto);
    }

    /**
     * Clone Value Object since they are immutable
     */
    clone() {
        return { ...this.dto };
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
