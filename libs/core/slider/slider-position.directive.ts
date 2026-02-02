import { Directive, ElementRef, Input, OnChanges, Renderer2, computed, effect, inject } from '@angular/core';
import { RtlService } from '@fundamental-ngx/cdk/utils';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fd-slider-position]'
})
export class SliderPositionDirective implements OnChanges {
    /** Position of the slider */
    @Input()
    position: number;

    /** Whether the slider is rendered vertically. */
    @Input()
    vertical = false;

    /** @hidden */
    private readonly _isRtl = computed(() => this._rtlService?.rtl() ?? false);

    /** @hidden */
    private readonly _rtlService = inject(RtlService, { optional: true });

    /** @hidden */
    private readonly _elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

    /** @hidden */
    private readonly _renderer = inject(Renderer2);

    /** @hidden */
    constructor() {
        effect(() => {
            this._setPosition(this._isRtl());
        });
    }

    /** @hidden */
    ngOnChanges(): void {
        this._setPosition();
    }
    /** @hidden */
    private _setPosition(rtl = this._isRtl()): void {
        if (this.vertical) {
            this._renderer.setStyle(this._elementRef.nativeElement, 'bottom', `${this.position}%`);
            return;
        }

        this._renderer.setStyle(this._elementRef.nativeElement, 'left', !rtl ? `${this.position}%` : 'unset');
        this._renderer.setStyle(this._elementRef.nativeElement, 'right', rtl ? `${this.position}%` : 'unset');
    }
}
