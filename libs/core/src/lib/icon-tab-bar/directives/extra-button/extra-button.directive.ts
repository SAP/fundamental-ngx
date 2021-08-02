import { AfterViewInit, Directive, ElementRef, Input, OnDestroy } from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

@Directive({
    selector: '[fdExtraButton]'
})
export class ExtraButtonDirective implements AfterViewInit, OnDestroy {

    @Input()
    anchorIndexInsideParent = 0;

    @Input()
    isRtl: boolean;

    @Input()
    extraButtonOffset = 0;

    private _onDestroy$ = new Subject();

    constructor(
        private _el: ElementRef,
    ) {
    }

    ngAfterViewInit(): void {
        fromEvent(window, 'resize')
            .pipe(
                debounceTime(50),
                distinctUntilChanged(),
                takeUntil(this._onDestroy$),
            )
            .subscribe((_ =>  this.calculatePosition()));

        this.calculatePosition();
    }

    ngOnDestroy(): void {
        this._onDestroy$.next();
        this._onDestroy$.complete();
    }

     calculatePosition(): void {
        const nativeEl = this._el.nativeElement;
        const parent = nativeEl.parentElement;

        const anchor = parent.children[this.anchorIndexInsideParent];
        const computed = getComputedStyle(anchor);

        const myPosition = this.isRtl
            ? anchor.offsetLeft - nativeEl.offsetWidth
            : anchor.offsetLeft + anchor.offsetWidth;

        const margin = this.isRtl
            ? parseInt(computed.marginLeft, 10)
            : parseInt(computed.marginRight, 10);

        const myPositionWithOffset = this.isRtl
            ? myPosition - margin - this.extraButtonOffset
            : myPosition + margin + this.extraButtonOffset;


        this._el.nativeElement.style.left = `${myPositionWithOffset}px`;
    }
}
