import { SubscriptionStrategy } from './subscription-strategy.interface';

/**
 * @description Passes value object into callback function.
 */
export class ValueStrategy<T> implements SubscriptionStrategy<T> {
    /** @hidden */
    createSubscription(value: T, updateLatestValue: (v: T) => any): Promise<void> {
        return Promise.resolve(value).then(updateLatestValue);
    }
}
