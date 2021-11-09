import { Observable } from 'rxjs';

/**
 * RxJS wrapper for IntersectionObserver class.
 * @param target HTML element to spy on.
 * @param options @see {IntersectionObserverInit}
 * @returns {Observable} with observer entries.
 */
export function intersectionObservable(
    target: Element,
    options?: IntersectionObserverInit
): Observable<IntersectionObserverEntry[]> {
    if ('IntersectionObserver' in window) {
        return new Observable((subscriber) => {
            const io = new IntersectionObserver((entries) => {
                subscriber.next(entries);
            }, options);

            io.observe(target);

            return function unsubscribe(): void {
                io.disconnect();
            };
        });
    }
}
