import { Directive, ElementRef, Input, OnChanges, OnDestroy, OnInit, Optional } from '@angular/core';
import { Subscription } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { RtlService } from '@fundamental-ngx/core/utils';

@Directive({
    // tslint:disable-next-line: directive-selector
    selector: '[fn-slider-position]'
})
export class SliderPositionDirective implements OnInit, OnChanges, OnDestroy {
    /** Slider position */
    @Input()
    position: number;

    /** If the slider is vertical */
    @Input()
    vertical = false;

    /** @hidden */
    private _isRtl = false;

    /** @hidden */
    private _rtlSubscription: Subscription;

    /** @hidden */
    constructor(
        private readonly _elementRef: ElementRef<HTMLElement>,
        @Optional() private readonly _rtlService: RtlService
    ) {}

    /** @hidden */
    ngOnInit(): void {
        this._subscribeToRtl();
    }

    /** @hidden */
    ngOnChanges(): void {
        this._setPosition();
    }

    /** @hidden */
    ngOnDestroy(): void {
        if (this._rtlSubscription) {
            this._rtlSubscription.unsubscribe();
        }
    }

    /** @hidden */
    private _setPosition(): void {
        const { style } = this._elementRef.nativeElement;

        if (this.vertical) {
            style.bottom = `${this.position}%`;
        } else {
            style.left = !this._isRtl ? `${this.position}%` : null;
            style.right = this._isRtl ? `${this.position}%` : null;
        }
    }

    /** @hidden Rtl change subscription */
    private _subscribeToRtl(): void {
        this._rtlSubscription = this._rtlService?.rtl
            .pipe(startWith(this._rtlService.rtl.getValue()))
            .subscribe((isRtl: boolean) => {
                this._isRtl = isRtl;

                this._setPosition();
            });
    }
}
