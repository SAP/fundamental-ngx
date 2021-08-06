import { AfterViewInit, Directive, ElementRef, Input, OnDestroy } from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[fdExtraButton, fd-extra-button]'
})
export class ExtraButtonDirective implements AfterViewInit, OnDestroy {

    /**
     * @description Position inside parent
     */
    @Input()
    anchorIndexInsideParent = 0;

    /**
     * @description Flag representing rtl mode
     */
    @Input()
    isRtl: boolean;

    /**
     * @description Offset to calculate correct position
     */
    @Input()
    extraButtonOffset = 0;

    /** @hidden */
    private _onDestroy$ = new Subject();

    /** @hidden */
    constructor(
        private _el: ElementRef,
    ) {
    }

    /** @hidden */
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

    /** @hidden */
    ngOnDestroy(): void {
        this._onDestroy$.next();
        this._onDestroy$.complete();
    }

    /**
     * @hidden
     * @description Calculate position of extra button
     */
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
