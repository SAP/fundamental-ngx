import { SubscriptionStrategy } from './subscription-strategy.interface';

/**
 * @description Passes value object into callback function.
 */
export class ValueStrategy implements SubscriptionStrategy {
    createSubscription(value: any, updateLatestValue: (v: any) => any): void {
        updateLatestValue(value);
    }
}
