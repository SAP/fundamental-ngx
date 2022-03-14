import { ElementRef, Inject, Injectable, OnDestroy, Optional } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { finalize, Observable, ReplaySubject, Subscription } from 'rxjs';
import { coerceElement } from '@angular/cdk/coercion';

@Injectable()
export class ResizeService extends ReplaySubject<ResizeObserverEntry> implements OnDestroy {
    public resized$!: Observable<ResizeObserverEntry>;

    private hostResizeObserver?: ResizeObserver;

    constructor(@Inject(DOCUMENT) private doc: Document, @Optional() private _elementRef: ElementRef<HTMLElement>) {
        super(1);
        if (this._elementRef) {
            this._setHostObserver();
        }
    }

    observeOn(elementRef: ElementRef<HTMLElement> | HTMLElement): Observable<ResizeObserverEntry> {
        const element = coerceElement(elementRef);
        const replaySubject$ = new ReplaySubject<ResizeObserverEntry>(1);
        const observer = new ResizeObserver(([entry]) => this.next(entry));
        observer.observe(element);
        return replaySubject$.pipe(finalize(() => observer.unobserve(element)));
    }

    ngOnDestroy(): void {
        this.complete();
        this._unobserve();
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    subscribe(observer: (value: ResizeObserverEntry) => void): Subscription {
        this._observe();
        return super.subscribe(observer);
    }

    unsubscribe(): void {
        this._unobserve();
        super.unsubscribe();
    }

    private _observe(): void {
        if (this.hostResizeObserver && this._elementRef) {
            this.hostResizeObserver.observe(this._elementRef.nativeElement);
        }
    }

    private _unobserve(): void {
        if (this.hostResizeObserver && this._elementRef) {
            this.hostResizeObserver.unobserve(this._elementRef.nativeElement);
        }
    }

    private _setHostObserver(): void {
        this.hostResizeObserver = new ResizeObserver(([entry]) => this.next(entry));
    }
}
