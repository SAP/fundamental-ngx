import { SubscriptionStrategy } from './subscription-strategy.interface';

/**
 * @description awaits for promise to resolve it's value and passes returned value into callback function.
 */
export class PromiseStrategy implements SubscriptionStrategy {
    createSubscription(async: Promise<any>, updateLatestValue: (v: any) => any): Promise<void> {
        return async.then(updateLatestValue, (e) => {
            console.error(e);
        });
    }
}
