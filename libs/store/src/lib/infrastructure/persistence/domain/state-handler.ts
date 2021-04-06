import 'reflect-metadata';
import { BaseValue } from '../../persistence/domain/base-classes/base-value';
import { Type } from '../../../domain/public_api';

export function instanceForType<T>(Type: Type<T>, fromState = {}) {
    const newState = new Type(fromState);

    return new Proxy(newState, new StateHandler(fromState));
}
/**
 *  Proxy wrapper
 */
class StateHandler<TModel> {
    constructor(
        /** Global entity state equals entity dto */
        private state: TModel
    ) {
    }

    get(target: any, prop: PropertyKey): any {
        // Check is nested object and wraps a new one proxy
        if (this.state[prop] && typeof this.state[prop] === 'object') {
            return new Proxy(this.state[prop], this);
        }

        return target[prop] || this.state[prop];
    }

    set(target: TModel, key: PropertyKey, value: unknown): boolean {
        if (value instanceof BaseValue) {
            const isEqual = Array.isArray(target) && target.some(elem => value.equals(elem)
                || value.equals(target[key]));

            if (!isEqual) {
                // target[key] = value;
                // return true;
                return Reflect.set(target as any, key, value);
            }
        } else {
            return Reflect.set(this.state as any, key, value);
        }

        return false;
    }
}

