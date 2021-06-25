import { SubscriptionStrategy } from './subscription-strategy.interface';

/**
 * @description awaits for promise to resolve it's value and passes returned value into callback function.
 */
export class PromiseStrategy implements SubscriptionStrategy {
    createSubscription(async: Promise<any>, updateLatestValue: (v: any) => any): Promise<any> {
        return async.then(updateLatestValue, e => {
            console.error(e);
        });
    }
}
