import { ElementRef, Injectable, OnDestroy } from '@angular/core';
import { Observable, Observer, Subject } from 'rxjs';
import { coerceElement } from '@angular/cdk/coercion';

interface ObservedElement {
    observer: ResizeObserver | null;
    readonly stream: Subject<ResizeObserverEntry[]>;
    count: number;
}

@Injectable({ providedIn: 'root' })
export class ResizeObserverFactory {
    /** Factory to create ResizeObserver if it's present in browser.  */
    create(callback: ResizeObserverCallback): ResizeObserver | null {
        return typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(callback);
    }
}

@Injectable({ providedIn: 'root' })
export class ResizeObserverService implements OnDestroy {
    /** @hidden */
    private _observedElements = new Map<Element, ObservedElement>();

    /** @hidden */
    constructor(private _resizeObserverFactory: ResizeObserverFactory) {}

    /** @hidden */
    ngOnDestroy(): void {
        this._observedElements.forEach((_, element) => this._cleanupObserver(element));
    }

    /** Observe the given element and emit whenever its size changes. */
    observe(elementOrRef: Element | ElementRef<Element>): Observable<ResizeObserverEntry[]> {
        const element = coerceElement(elementOrRef);

        return new Observable((observer: Observer<ResizeObserverEntry[]>) => {
            const stream = this._observeElement(element);
            const subscription = stream.subscribe(observer);

            return () => {
                subscription.unsubscribe();
                this._unobserveElement(element);
            };
        });
    }

    /**
     * Observes the given element by using the existing MutationObserver if available, or creating a
     * new one if not.
     */
    private _observeElement(element: Element): Subject<ResizeObserverEntry[]> {
        if (!this._observedElements.has(element)) {
            const stream = new Subject<ResizeObserverEntry[]>();
            const observer = this._resizeObserverFactory.create((mutations) => stream.next(mutations));
            if (observer) {
                observer.observe(element);
            }
            this._observedElements.set(element, { observer, stream, count: 1 });
        } else {
            this._observedElements.get(element)!.count++;
        }
        return this._observedElements.get(element)!.stream;
    }

    /**
     * Un-observes the given element and cleans up the underlying MutationObserver if nobody else is
     * observing this element.
     */
    private _unobserveElement(element: Element): void {
        if (this._observedElements.has(element)) {
            this._observedElements.get(element)!.count--;
            if (!this._observedElements.get(element)!.count) {
                this._cleanupObserver(element);
            }
        }
    }

    /** Clean up the underlying MutationObserver for the specified element. */
    private _cleanupObserver(element: Element): void {
        if (this._observedElements.has(element)) {
            const { observer, stream } = this._observedElements.get(element)!;
            if (observer) {
                observer.disconnect();
            }
            stream.complete();
            this._observedElements.delete(element);
        }
    }
}
