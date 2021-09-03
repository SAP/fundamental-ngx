import { Observable } from 'rxjs';
import { SubscriptionStrategy } from './subscription-strategy.interface';

/**
 * @description Converts observable into Promise and passes returned value into callback function.
 */
export class ObservableStrategy implements SubscriptionStrategy {
    createSubscription(async: Observable<any>, updateLatestValue: any): Promise<void> {
        return async.toPromise().then(updateLatestValue, e => {
            console.error(e);
        });
    }
}
