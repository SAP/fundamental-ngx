import { AfterViewInit, Directive, ElementRef, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

@Directive({
    selector: '[fdExtraButton]'
})
export class ExtraButtonDirective implements OnChanges, AfterViewInit, OnDestroy {

    @Input()
    lastVisibleItemIndex: number;

    @Input()
    isRtl: boolean;

    private unsubscribe$$ = new Subject();

    constructor(
        private _el: ElementRef,
    ) {
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.isRtl && !changes.isRtl.firstChange) {
            this._calculatePosition();
        }
    }

    ngAfterViewInit(): void {
        fromEvent(window, 'resize')
            .pipe(
                debounceTime(50),
                distinctUntilChanged(),
                takeUntil(this.unsubscribe$$),
            )
            .subscribe((_) => this._calculatePosition());

        this._calculatePosition();
    }

    private _calculatePosition(): void {
        const nativeEl = this._el.nativeElement;
        const parent = nativeEl.parentElement;

        const anchor = parent.children[this.lastVisibleItemIndex];
        const computed = getComputedStyle(anchor);

        const myPosition = this.isRtl
            ? anchor.offsetLeft - nativeEl.offsetWidth
            : anchor.offsetLeft + anchor.offsetWidth;

        const margin = this.isRtl
            ? parseInt(computed.marginLeft, 10)
            : parseInt(computed.marginRight, 10);

        const myPositionWithOffset = this.isRtl
            ? myPosition - margin
            : myPosition + margin;

        this._el.nativeElement.style.left = `${myPositionWithOffset}px`;
    }

    ngOnDestroy(): void {
        this.unsubscribe$$.next();
        this.unsubscribe$$.complete();
    }
}
