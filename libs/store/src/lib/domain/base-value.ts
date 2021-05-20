import { deepFreeze } from './utility';
import { Composite } from './composite';

export abstract class BaseValue<T> extends Composite<T>{
    constructor(dto: T) {
        super(deepFreeze(dto));
    }

    /**
     * Clone Value Object since they are immutable
     */
    clone(): T {
        return { ...this.value };
    }

    /**
     *  Check if two Value Objects are equal. Checks structural equality.
     * @param vo ValueObject
     */
    public equals(vo: BaseValue<T>): boolean {
        if (vo === null || vo === undefined) {
            return false;
        }
        return JSON.stringify(this.value) === JSON.stringify(vo?.value);
    }
}