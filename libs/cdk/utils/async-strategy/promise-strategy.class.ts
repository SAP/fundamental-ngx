import { SubscriptionStrategy } from './subscription-strategy.interface';

/**
 * @description awaits for promise to resolve it's value and passes returned value into callback function.
 */
export class PromiseStrategy<T> implements SubscriptionStrategy<T> {
    /** @hidden */
    createSubscription(async: Promise<T>, updateLatestValue: (v: T) => any): Promise<void> {
        return async.then(updateLatestValue, (e) => {
            console.error(e);
        });
    }
}
