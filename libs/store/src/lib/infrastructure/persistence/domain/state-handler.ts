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
        // Check is an array and wraps a new one proxy
        if (['[object Object]', '[object Array]']
            .indexOf(Object.prototype.toString.call(this.targetState[prop])) > -1) {
            return new Proxy(this.targetState[prop], this);
        }
        return target[prop] || this.targetState[prop];
    }

    set<T>(target: TModel, key: PropertyKey, value: Type<T> | Array<Type<T>>): boolean {
        if (value instanceof BaseValue) {
            if (!value.dto) {
                this.targetState[key] = value;
                return true;
            }
            const isEqual = Array.isArray(target) && target.some(elem => value.equals(elem)
                || value.equals(target[key]));

            let clonedVO = target[key] && value.clone();
            if (!isEqual) {
                clonedVO = new (Object.getPrototypeOf(value).constructor)(value.dto);
                this.targetState[key] = clonedVO;
                return true;
            }
        } else {
            this.targetState[key] = value;
            return true;
        }

        return true;
    }
}

