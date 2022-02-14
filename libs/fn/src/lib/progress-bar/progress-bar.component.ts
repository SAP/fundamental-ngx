import { coerceNumberProperty } from '@angular/cdk/coercion';
import {
    Component,
    OnInit,
    ViewEncapsulation,
    ChangeDetectionStrategy,
    Input,
    ElementRef,
    OnChanges,
    HostBinding
} from '@angular/core';
import { applyCssClass, CssClassBuilder } from '@fundamental-ngx/core/utils';

export type ProgressBarState = 'positive' | 'critical' | 'negative';

@Component({
    selector: 'fn-progress-bar',
    templateUrl: './progress-bar.component.html',
    styleUrls: ['./progress-bar.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProgressBarComponent implements OnInit, OnChanges, CssClassBuilder {
    /**
     * Progress bar state.
     */
    @Input()
    state: ProgressBarState;

    /**
     * Aria-valuetext for progress bar.
     */
    @Input()
    @HostBinding('attr.aria-valuetext')
    ariaValueText: string;

    /**
     * Aria-label for progress bar.
     */
    @Input()
    @HostBinding('attr.aria-label')
    ariaLabel: string;

    /**
     * Min progress bar value.
     */
    @Input()
    @HostBinding('attr.aria-valuemin')
    set min(value: number) {
        this._min = coerceNumberProperty(value, this._min);
    }

    get min(): number {
        return this._min;
    }

    /**
     * Max progress bar value.
     */
    @Input()
    @HostBinding('attr.aria-valuemax')
    set max(value: number) {
        this._max = coerceNumberProperty(value, this._max);
    }

    get max(): number {
        return this._max;
    }

    /**
     * Progress bar value.
     */
    @Input()
    @HostBinding('attr.aria-valuenow')
    set value(value: number) {
        let newValue = coerceNumberProperty(value, this._max);

        if (newValue > this.max) {
            newValue = this.max;
        }

        if (newValue < this.min) {
            newValue = this.min;
        }

        this._value = newValue;

        this._percentage = this._calculateProgress();
    }

    get value(): number {
        return this._value;
    }

    /** @hidden */
    @HostBinding('attr.tabindex')
    private _tabindex = -1;

    /** @hidden */
    @HostBinding('attr.role')
    private _role = 'progressbar';

    /** @hidden */
    _percentage = 0;

    /** @hidden */
    private _min = 0;
    /** @hidden */
    private _max = 100;
    /** @hidden */
    private _value = 0;

    /** @hidden
     * User custom class
     */
    @Input()
    class: string;

    /** @hidden */
    constructor(private _elmRef: ElementRef<HTMLElement>) {}

    /** @hidden */
    ngOnChanges(): void {
        this.buildComponentCssClass();
    }

    /** @hidden */
    ngOnInit(): void {
        this.buildComponentCssClass();
    }

    /** @hidden */
    @applyCssClass
    buildComponentCssClass(): string[] {
        const classList = ['fn-progress-bar', this.state ? `fn-progress-bar--${this.state}` : '', this.class];

        return classList;
    }

    /** @hidden */
    elementRef(): ElementRef {
        return this._elmRef;
    }

    /** @hidden */
    private _calculateProgress(): number {
        return ((this.value - this.min) / (this.max - this.min)) * 100;
    }
}
