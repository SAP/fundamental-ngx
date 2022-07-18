/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { MutationObserverFactory } from '@angular/cdk/observers';
import { Observable, Observer, Subject } from 'rxjs';
import { ElementRef, Injectable, OnDestroy } from '@angular/core';
import { getNativeElement } from '@fundamental-ngx/fn/utils';
import { HasElementRef } from '../has-element-ref';

@Injectable({
    providedIn: 'root'
})
export class AttributeObserver implements OnDestroy {
    private _observedElements = new Map<
        Element,
        {
            observer: MutationObserver | null;
            stream: Subject<MutationRecord[]>;
            count: number;
        }
    >();

    constructor(private _mutationObserverFactory: MutationObserverFactory) {}

    ngOnDestroy(): void {
        this._observedElements.forEach((_, element) => this._cleanupObserver(element));
    }

    observe(elementOrRef: Element | ElementRef<Element> | HasElementRef<Element>): Observable<MutationRecord[]> {
        const element = getNativeElement(elementOrRef);
        return new Observable((observer: Observer<MutationRecord[]>) => {
            const stream = this._observeElement(element);
            const subscription = stream.subscribe(observer);

            return () => {
                subscription.unsubscribe();
                this._unobserveElement(element);
            };
        });
    }

    unobserve(element: HasElementRef<Element> | Element | ElementRef<Element>): void {
        this._unobserveElement(getNativeElement(element));
    }

    private _observeElement(element: Element): Subject<MutationRecord[]> {
        if (!this._observedElements.has(element)) {
            const stream = new Subject<MutationRecord[]>();
            const observer = this._mutationObserverFactory.create((mutations) => stream.next(mutations));
            if (observer) {
                observer.observe(element, {
                    attributes: true
                });
            }
            this._observedElements.set(element, { observer, stream, count: 1 });
        } else {
            this._observedElements.get(element)!.count++;
        }
        return this._observedElements.get(element)!.stream;
    }

    private _unobserveElement(element: Element): void {
        if (this._observedElements.has(element)) {
            this._observedElements.get(element)!.count--;
            if (!this._observedElements.get(element)!.count) {
                this._cleanupObserver(element);
            }
        }
    }

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
