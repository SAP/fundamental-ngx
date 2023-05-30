import { Observable } from 'rxjs';

export interface SubscriptionStrategy<T = any> {
    /**
     * @description Awaits object to resolve it's value and passes it to the callback function.
     * @param obj Object to be awaited.
     * @param updateLatestValue Callback function where awaited value will be passed.
     * as an argument
     */
    createSubscription(
        obj: Observable<T> | Promise<T> | (() => void) | T,
        updateLatestValue: (value: T) => void
    ): Promise<void>;
}
