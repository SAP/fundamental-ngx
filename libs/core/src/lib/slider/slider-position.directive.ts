import { ChangeDetectorRef, Directive, ElementRef, Input, OnChanges, OnDestroy, OnInit, Optional } from '@angular/core';
import { Subscription } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { RtlService } from '@fundamental-ngx/core/utils';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fd-slider-position]'
})
export class SliderPositionDirective implements OnInit, OnChanges, OnDestroy {
    /** Position of the slider */
    @Input()
    position: number;

    /** @hidden */
    private _isRtl = false;

    /** @hidden */
    private _rtlSubscription: Subscription;

    /** @hidden */
    constructor(
        private readonly _cd: ChangeDetectorRef,
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

        style.left = !this._isRtl ? `${this.position}%` : 'unset';
        style.right = this._isRtl ? `${this.position}%` : 'unset';
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
