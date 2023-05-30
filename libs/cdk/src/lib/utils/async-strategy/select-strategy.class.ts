import { Observable } from 'rxjs';
import { isFunction, isPromise, isSubscribable } from '../typecheck';

import { FunctionStrategy } from './function-strategy.class';
import { ObservableStrategy } from './observable-strategy.class';
import { PromiseStrategy } from './promise-strategy.class';
import { SubscriptionStrategy } from './subscription-strategy.interface';
import { ValueStrategy } from './value-strategy.class';

/**
 * @description Selects appropriate strategy on how to resolve function value
 * @param obj object to get value from
 * @returns appropriate strategy to retrieve value from the object
 */
export function selectStrategy<T = any>(obj: Observable<T> | Promise<T> | (() => void) | T): SubscriptionStrategy<T> {
    if (isPromise(obj)) {
        return new PromiseStrategy<T>();
    }

    if (isSubscribable(obj)) {
        return new ObservableStrategy<T>();
    }

    if (isFunction(obj)) {
        return new FunctionStrategy<T>();
    }

    return new ValueStrategy<T>();
}
