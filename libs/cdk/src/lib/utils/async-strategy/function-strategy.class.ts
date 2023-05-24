import { isFunction } from '../typecheck';
import { SubscriptionStrategy } from './subscription-strategy.interface';

/**
 * @description Executes function and passes returned value into callback function.
 */
export class FunctionStrategy<T> implements SubscriptionStrategy<T> {
    /** @hidden */
    createSubscription(fn: () => T, updateLatestValue: (v: T) => any): Promise<void> {
        const result = isFunction(fn) ? fn() : ((<any>fn) as T);
        return Promise.resolve(result).then(updateLatestValue);
    }
}
