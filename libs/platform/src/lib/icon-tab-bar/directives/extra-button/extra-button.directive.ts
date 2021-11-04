import { AfterViewInit, Directive, ElementRef, Input, NgZone, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ViewportRuler } from '@angular/cdk/overlay';

const EXTRA_BUTTON_OFFSET_PX = 16;

@Directive({
    selector: '[fdpExtraButton], [fdp-extra-button]'
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
    addButtonOffset = false;

    /** @hidden */
    private _onDestroy$ = new Subject();

    /** @hidden */
    constructor(private _el: ElementRef, private _viewportRuler: ViewportRuler, private _ngZone: NgZone) {}

    /** @hidden */
    ngAfterViewInit(): void {
        this._viewportRuler
            .change(50)
            .pipe(takeUntil(this._onDestroy$))
            // ViewportRuler invoked out of zone, that is why I need to invoke function in zone
            .subscribe(() => this._ngZone.run(() => this.calculatePosition()));

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

        if (this.anchorIndexInsideParent === -1) {
            this._el.nativeElement.style[this.isRtl ? 'right' : 'left'] = `${EXTRA_BUTTON_OFFSET_PX}px`;
            return;
        } else {
            this._el.nativeElement.style.right = null;
        }

        const anchor = parent.children[this.anchorIndexInsideParent];
        const computed = getComputedStyle(anchor);

        const myPosition = this.isRtl
            ? anchor.offsetLeft - nativeEl.offsetWidth
            : anchor.offsetLeft + anchor.offsetWidth;

        const margin = this.isRtl ? parseInt(computed.marginLeft, 10) : parseInt(computed.marginRight, 10);

        const buttonOffset = this.addButtonOffset ? EXTRA_BUTTON_OFFSET_PX : 0;
        const myPositionWithOffset = this.isRtl
            ? myPosition - margin - buttonOffset
            : myPosition + margin + buttonOffset;

        this._el.nativeElement.style.left = `${myPositionWithOffset}px`;
    }
}
