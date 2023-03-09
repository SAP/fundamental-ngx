import { ChangeDetectorRef, EventEmitter, OnDestroy, Pipe, PipeTransform, inject } from '@angular/core';
import { Observable, Subscribable, Unsubscribable } from 'rxjs';
import { isPromise, isSubscribable } from '../typecheck';

interface SubscriptionStrategy {
    createSubscription(
        async: Subscribable<any> | Promise<any> | any,
        updateLatestValue: any
    ): Unsubscribable | Promise<any> | any;
    dispose(subscription: Unsubscribable | Promise<any> | undefined): void;
}

class SubscribableStrategy implements SubscriptionStrategy {
    createSubscription(async: Subscribable<any>, updateLatestValue: any): Unsubscribable {
        return async.subscribe({
            next: updateLatestValue,
            error: (e: any) => {
                throw e;
            }
        });
    }

    dispose(subscription: Unsubscribable | undefined): void {
        subscription?.unsubscribe();
    }
}

class PromiseStrategy implements SubscriptionStrategy {
    createSubscription(async: Promise<any>, updateLatestValue: (v: any) => any): Promise<any> {
        return async.then(updateLatestValue, (e) => {
            throw e;
        });
    }

    dispose(): void {}
}

class StaticStrategy implements SubscriptionStrategy {
    createSubscription(async: any, updateLatestValue: any): any {
        return Promise.resolve(async).then(updateLatestValue);
    }

    dispose(): void {}
}

@Pipe({
    name: 'fdkAsyncOrSync',
    pure: false,
    standalone: true
})
export class AsyncOrSyncPipe implements PipeTransform, OnDestroy {
    /** @hidden */
    private _ref = inject(ChangeDetectorRef, {
        optional: true
    });

    /** @hidden */
    private _subscription: Unsubscribable | Promise<any> | undefined;
    /** @hidden */
    private _obj: Subscribable<any> | Promise<any> | EventEmitter<any> | null = null;
    /** @hidden */
    private _strategy: SubscriptionStrategy;

    /** @hidden */
    private _latestValue: any;

    /** @hidden */
    ngOnDestroy(): void {
        if (this._subscription) {
            this._dispose();
        }
        // Clear the `ChangeDetectorRef` and its association with the view data, to mitigate
        // potential memory leaks in Observables that could otherwise cause the view data to
        // be retained.
        // https://github.com/angular/angular/issues/17624
        this._ref = null;
    }

    /** @hidden */
    transform<T>(obj: Observable<T> | Subscribable<T> | Promise<T> | T | null | undefined): T {
        if (!this._obj) {
            if (obj) {
                this._subscribe(obj);
            }
            return this._latestValue;
        }

        if (obj !== this._obj) {
            this._dispose();
            return this.transform(obj);
        }

        return this._latestValue;
    }

    /** @hidden */
    private _subscribe(obj: Subscribable<any> | Promise<any> | EventEmitter<any> | any): void {
        this._obj = obj;
        this._strategy = this._selectStrategy(obj);
        this._subscription = this._strategy.createSubscription(obj, (value: Record<string, any>) =>
            this._updateLatestValue(obj, value)
        );
    }

    /** @hidden */
    private _selectStrategy(obj: Subscribable<any> | Promise<any> | EventEmitter<any> | any): SubscriptionStrategy {
        if (isPromise(obj)) {
            return new PromiseStrategy();
        }

        if (isSubscribable(obj)) {
            return new SubscribableStrategy();
        }

        return new StaticStrategy();
    }

    /** @hidden */
    private _dispose(): void {
        // Note: `dispose` is only called if a subscription has been initialized before, indicating
        // that `this._strategy` is also available.
        this._strategy.dispose(this._subscription);
        this._latestValue = null;
        this._subscription = undefined;
        this._obj = null;
    }

    /** @hidden */
    private _updateLatestValue(async: any, value: Record<string, any>): void {
        if (async === this._obj) {
            this._latestValue = value;
            this._ref?.markForCheck();
        }
    }
}
