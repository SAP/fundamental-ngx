import { SubscriptionStrategy } from './subscription-strategy.interface';
import { isFunction } from '../utils/lang';

/**
 * @description Executes function and passes returned value into callback function.
 */
export class FunctionStrategy implements SubscriptionStrategy {
    createSubscription(fn: Function, updateLatestValue: (v: any) => any): Promise<void> {
        const result = isFunction(fn) ? fn() : fn;
        return Promise.resolve(result).then(updateLatestValue);
    }
}
