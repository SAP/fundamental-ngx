import { fromEvent, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * RxJS wrapper for ResizeObserver class.
 * @param target HTML element to spy on.
 * @param options @see {ResizeObserverOptions}
 * @returns {Observable} with observer entries.
 */
export function resizeObservable(target: Element, options?: ResizeObserverOptions): Observable<ResizeObserverEntry[]> {
    if ('ResizeObserver' in window) {
        return new Observable((subscriber) => {
            let animationFrame: number;
            const ro = new ResizeObserver((entries) => {
                animationFrame = window.requestAnimationFrame(() => {
                    subscriber.next(entries);
                });
            });

            ro.observe(target, options);

            return function unsubscribe(): void {
                if (animationFrame) {
                    window.cancelAnimationFrame(animationFrame);
                }
                ro.unobserve(target);
                ro.disconnect();
            };
        });
    } else {
        // If current browser does not support resizeObserver, rely on window resize and return empty array of items.
        return fromEvent(window, 'resize').pipe(map(() => []));
    }
}
