import { BaseValue } from '../../persistence/domain/base-classes/base-value';
import { Type } from '../../../domain/utility';

export function instanceForType<T>(Type: Type<T>, fromState = {}) {
    const newState = new Type(fromState);

    return new Proxy(newState, new StateHandler(fromState));
}
/**
 *  Proxy wrapper
 */
class StateHandler<TModel> {
    constructor(
        /** Plain entity dto object */
        private state: TModel
    ) {
    }

    get(target: any, prop: PropertyKey): any {
        // Check is nested object and wraps a new one proxy
        if (this.state[prop] && typeof this.state[prop] === 'object') {
            return new Proxy(this.state[prop], this);
        }

        return Reflect.get(target as any, prop);
    }

    set(target: TModel, key: PropertyKey, value: any): boolean {
        if (Array.isArray(value)) {
            // assign array with several elements
            return Reflect.set(target['value'] as any, key, value);
        }
        if (value instanceof BaseValue) {
            const isEqual = Array.isArray(target) && target.some(elem => value.equals(elem)
                || value.equals(target[key]));

            if (!isEqual) {
                return Reflect.set(target as any, key, value);
            }
        } else {
            return Reflect.set(target as any, key, value);
        }

        return false;
    }
}
