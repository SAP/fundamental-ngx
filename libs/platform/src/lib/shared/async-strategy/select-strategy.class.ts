import { Observable } from 'rxjs';

import { isFunction, isPromise, isSubscribable } from '../utils/lang';
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
export function selectStrategy(obj: Observable<any> | Promise<any> | (() => void)): SubscriptionStrategy {
    if (isPromise(obj)) {
        return new PromiseStrategy();
    }

    if (isSubscribable(obj)) {
        return new ObservableStrategy();
    }

    if (isFunction(obj)) {
        return new FunctionStrategy();
    }

    return new ValueStrategy();
}
