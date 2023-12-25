import { Directive, ElementRef, Input, OnChanges, Optional, Renderer2, computed, effect } from '@angular/core';
import { RtlService } from '@fundamental-ngx/cdk/utils';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fd-slider-position]',
    standalone: true
})
export class SliderPositionDirective implements OnChanges {
    /** Position of the slider */
    @Input()
    position: number;

    /** Whether the slider is rendered vertically. */
    @Input()
    vertical = false;

    private readonly _rtl$ = computed(() => !!this._rtlService?.rtlSignal());

    /** @hidden */
    constructor(
        private readonly _elementRef: ElementRef<HTMLElement>,
        private readonly _renderer: Renderer2,
        @Optional() private readonly _rtlService: RtlService
    ) {
        effect(() => {
            this._setPosition(this._rtl$());
        });
    }

    /** @hidden */
    ngOnChanges(): void {
        this._setPosition();
    }
    /** @hidden */
    private _setPosition(rtl = this._rtl$()): void {
        if (this.vertical) {
            this._renderer.setStyle(this._elementRef.nativeElement, 'bottom', `${this.position}%`);
            return;
        }

        this._renderer.setStyle(this._elementRef.nativeElement, 'left', !rtl ? `${this.position}%` : 'unset');
        this._renderer.setStyle(this._elementRef.nativeElement, 'right', rtl ? `${this.position}%` : 'unset');
    }
}
