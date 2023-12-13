import { Directive, ElementRef, Input, OnChanges, OnDestroy, OnInit, Optional, Renderer2 } from '@angular/core';
import { RtlService } from '@fundamental-ngx/cdk/utils';
import { Subscription } from 'rxjs';
import { startWith } from 'rxjs/operators';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fd-slider-position]',
    standalone: true
})
export class SliderPositionDirective implements OnInit, OnChanges, OnDestroy {
    /** Position of the slider */
    @Input()
    position: number;

    /** Whether the slider is rendered vertically. */
    @Input()
    vertical = false;

    /** @ignore */
    private _isRtl = false;

    /** @ignore */
    private _rtlSubscription: Subscription;

    /** @ignore */
    constructor(
        private readonly _elementRef: ElementRef<HTMLElement>,
        private readonly _renderer: Renderer2,
        @Optional() private readonly _rtlService: RtlService
    ) {}

    /** @ignore */
    ngOnInit(): void {
        this._subscribeToRtl();
    }

    /** @ignore */
    ngOnChanges(): void {
        this._setPosition();
    }

    /** @ignore */
    ngOnDestroy(): void {
        if (this._rtlSubscription) {
            this._rtlSubscription.unsubscribe();
        }
    }

    /** @ignore */
    private _setPosition(): void {
        if (this.vertical) {
            this._renderer.setStyle(this._elementRef.nativeElement, 'bottom', `${this.position}%`);
            return;
        }

        this._renderer.setStyle(this._elementRef.nativeElement, 'left', !this._isRtl ? `${this.position}%` : 'unset');
        this._renderer.setStyle(this._elementRef.nativeElement, 'right', this._isRtl ? `${this.position}%` : 'unset');
    }

    /** @ignore Rtl change subscription */
    private _subscribeToRtl(): void {
        this._rtlSubscription = this._rtlService?.rtl
            .pipe(startWith(this._rtlService.rtl.getValue()))
            .subscribe((isRtl: boolean) => {
                this._isRtl = isRtl;

                this._setPosition();
            });
    }
}
