import { ChangeDetectionStrategy, Component, HostBinding, Input, ViewEncapsulation } from '@angular/core';

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
    ariaLabel: string | null = null;

    /**
     * Aria-labelledby for slider handle.
     */
    @Input()
    @HostBinding('[attr.aria-labelledby]')
    ariaLabelledBy: string | null = null;

    /**
     * Aria-valuenow for slider handle.
     */
    @Input()
    @HostBinding('[attr.aria-valuenow]')
    ariaValueNow: string | null = null;

    /**
     * Aria-valuetext for slider handle.
     */
    @Input()
    @HostBinding('[attr.aria-valuetext]')
    ariaValueText: string | null = null;

    /**
     * Aria-valuemax for slider handle.
     */
    @Input()
    @HostBinding('[attr.aria-valuemax]')
    ariaValueMax: string | null = null;

    /**
     * Aria-valuemin for slider handle.
     */
    @Input()
    @HostBinding('[attr.aria-valuemin]')
    ariaValueMin: string | null = null;
}
