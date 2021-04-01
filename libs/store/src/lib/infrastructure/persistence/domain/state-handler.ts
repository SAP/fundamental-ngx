import 'reflect-metadata';
import { BaseValue } from '../../persistence/domain/base-classes/base-value';
import { Type } from '../../../domain/public_api';

export function instanceForType<T>(Type: Type<T>, fromState = {}) {
    const newState = new Type();

    return new Proxy(newState, new StateHandler(fromState));
}
/**
 *  Proxy wrapper
 */
class StateHandler<TModel> {
    constructor(
        private targetState?: TModel
    ) {
    }

    get(target: any, prop: PropertyKey): any {
        // Check is nested object and wraps a new one proxy
        if (this.targetState[prop] && typeof this.targetState[prop] === 'object') {
            return new Proxy(this.targetState[prop], this);
        }
        return target[prop] || this.targetState[prop];
    }

    set(target: TModel, key: PropertyKey, value: unknown): boolean {
        if (value instanceof BaseValue) {
            if (!value.dto) {
                this.targetState[key] = value;
                return true;
            }
            const isEqual = Array.isArray(target) && target.some(elem => value.equals(elem)
                || value.equals(target[key]));

            if (!isEqual) {
                target[key] = new (Object.getPrototypeOf(value).constructor)(value.dto);
                return true;
            }
        } else {
            return Reflect.set(this.targetState as any, key, value);
        }

        return true;
    }
}

