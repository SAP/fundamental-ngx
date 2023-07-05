import { Directive, ElementRef, Input, OnChanges, OnDestroy, OnInit, Optional, Renderer2 } from '@angular/core';
import { Subscription } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { RtlService } from '@fundamental-ngx/cdk/utils';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fd-slider-position]'
})
export class SliderPositionDirective implements OnInit, OnChanges, OnDestroy {
    /** Position of the slider */
    @Input()
    position: number;

    /** Whether the slider is rendered vertically. */
    @Input()
    vertical = false;

    /** @hidden */
    private _isRtl = false;

    /** @hidden */
    private _rtlSubscription: Subscription;

    /** @hidden */
    constructor(
        private readonly _elementRef: ElementRef<HTMLElement>,
        private readonly _renderer: Renderer2,
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
        if (this.vertical) {
            this._renderer.setStyle(this._elementRef.nativeElement, 'bottom', `${this.position}%`);
            return;
        }

        this._renderer.setStyle(this._elementRef.nativeElement, 'left', !this._isRtl ? `${this.position}%` : 'unset');
        this._renderer.setStyle(this._elementRef.nativeElement, 'right', this._isRtl ? `${this.position}%` : 'unset');
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
