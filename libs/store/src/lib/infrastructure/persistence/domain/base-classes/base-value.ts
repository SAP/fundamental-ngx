import { Composite } from './composite';

export abstract class BaseValue<T> extends Composite<T>{
    protected constructor(dto: T) {
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
    public equals(vo?: BaseValue<T>): boolean {
        if (vo === null || vo === undefined) {
            return false;
        }
        return JSON.stringify(this) === JSON.stringify(vo);
    }
}

function deepFreeze<T>(object: T): T {
    Object.freeze(object);
    if (object === undefined) {
        return object;
    }

    Object.getOwnPropertyNames(object).forEach((prop => {
        if (object[prop] !== null
            && (typeof object[prop] === "object" || typeof object[prop] === "function")
            && !Object.isFrozen(object[prop])) {
            deepFreeze(object[prop]);
        }
    }));

    return object;
}
