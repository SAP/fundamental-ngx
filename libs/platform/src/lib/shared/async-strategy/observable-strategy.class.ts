import { Observable } from 'rxjs';
import { SubscriptionStrategy } from './subscription-strategy.interface';

/**
 * @description Converts observable into Promise and passes returned value into callback function.
 */
export class ObservableStrategy<T> implements SubscriptionStrategy<T> {
    /** @hidden */
    createSubscription(async: Observable<T>, updateLatestValue: any): Promise<void> {
        return async.toPromise().then(updateLatestValue, (e) => {
            console.error(e);
        });
    }
}
