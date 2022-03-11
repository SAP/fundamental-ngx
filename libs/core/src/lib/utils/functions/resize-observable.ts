import { fromEvent, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// Old version of typescript does not allow to build this properly.
declare var ResizeObserver: any;

/**
 * RxJS wrapper for ResizeObserver class.
 * @param target HTML element to spy on.
 * @param options @see {ResizeObserverOptions}
 * @returns {Observable} with observer entries.
 */
export function resizeObservable(target: Element, options?: any): Observable<any[]> {
    if ('ResizeObserver' in window) {
        return new Observable((subscriber) => {
            const ro = new ResizeObserver((entries: any) => {
                subscriber.next(entries);
            });

            ro.observe(target, options);

            return function unsubscribe(): void {
                ro.disconnect();
            };
        });
    } else {
        // If current browser does not support resizeObserver, rely on window resize and return empty array of items.
        return fromEvent(window, 'resize').pipe(map(() => []));
    }
}
