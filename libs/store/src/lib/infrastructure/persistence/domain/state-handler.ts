import 'reflect-metadata';
import { BaseValue } from '../../persistence/domain/base-classes/base-value';

type Class<T> = new(...args: any[]) => T;
type ArrayClass<T> = Array<Class<T>>;
export function instanceForType<T>(Type: Class<T>, fromState?: any) {
    const newState = new Type();

    return new Proxy(newState, new StateHandler(
        {
            title: 'Req 1',
            lineItems: [
                { title: 'Line1', price: 100, amount: { currency: 'EUR', amount: 200 }},
                { title: 'Line1', price: 200, amount: { currency: 'USD', amount: 200 }}
            ]
        }
        )); // <--- this.internalState ?? fromState
}

class StateHandler<TModel> {
    constructor(
        private targetState?: TModel
    ) {
    }

    get(target: any, prop: PropertyKey, r: any): any {
        if (['[object Object]', '[object Array]']
            .indexOf(Object.prototype.toString.call(this.targetState[prop])) > -1) {
            return new Proxy(this.targetState[prop], this);
        }
        return target[prop] || this.targetState[prop];
    }

    set<T>(target: TModel, key: PropertyKey, value: Class<T> | ArrayClass<T>, receiver: any): boolean {
        if (value instanceof BaseValue) {
            if (!value.dto) {
                this.targetState[key] = value;
                return true;
            }
            const isEqual = Array.isArray(target) && target.some(elem => value.equals(elem)
                || value.equals(target[key]));

            let clonedVO = target[key] && value.clone();
            if (!isEqual) {
                target[key] = new (Object.getPrototypeOf(value).constructor)(value.dto);
                this.targetState[key] = target[key];
                return true;
            }
        } else {
            this.targetState[key] = value;
            return true;
        }

        return true;
    }
}

