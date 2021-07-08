import { AfterViewInit, Directive, ElementRef, Input, OnDestroy } from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

@Directive({
    selector: '[fdExtraButton]'
})
export class ExtraButtonDirective implements AfterViewInit, OnDestroy {

    @Input()
    lastVisibleItemIndex: number;

    private unsubscribe$$ = new Subject();

    constructor(
        private _el: ElementRef,
    ) {
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
        const myPosition = anchor.offsetLeft + anchor.offsetWidth;
        const marginLeft = parseInt(computed.marginRight, 10);

        this._el.nativeElement.style.left = `${myPosition + marginLeft}px`;
    }

    ngOnDestroy(): void {
        this.unsubscribe$$.next();
        this.unsubscribe$$.complete();
    }
}
