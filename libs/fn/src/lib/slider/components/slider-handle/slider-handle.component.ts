import { ChangeDetectionStrategy, Component, HostBinding, Input, ViewEncapsulation } from '@angular/core';
import { Nullable } from '@fundamental-ngx/cdk/utils';

@Component({
    selector: 'fn-slider-handle',
    templateUrl: './slider-handle.component.html',
    styleUrls: ['./slider-handle.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'fn-slider__handle',
        role: 'slider',
        tabindex: '0'
    }
})
export class SliderHandleComponent {
    /**
     * Aria-label for slider handle.
     */
    @Input()
    @HostBinding('[attr.aria-label]')
    ariaLabel: Nullable<string> = null;

    /**
     * Aria-labelledby for slider handle.
     */
    @Input()
    @HostBinding('[attr.aria-labelledby]')
    ariaLabelledBy: Nullable<string> = null;

    /**
     * Aria-valuenow for slider handle.
     */
    @Input()
    @HostBinding('[attr.aria-valuenow]')
    ariaValueNow: Nullable<string | number> = null;

    /**
     * Aria-valuetext for slider handle.
     */
    @Input()
    @HostBinding('[attr.aria-valuetext]')
    ariaValueText: Nullable<string | number> = null;

    /**
     * Aria-valuemax for slider handle.
     */
    @Input()
    @HostBinding('[attr.aria-valuemax]')
    ariaValueMax: Nullable<string> = null;

    /**
     * Aria-valuemin for slider handle.
     */
    @Input()
    @HostBinding('[attr.aria-valuemin]')
    ariaValueMin: Nullable<string> = null;
}
