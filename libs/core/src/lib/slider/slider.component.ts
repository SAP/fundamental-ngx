import {
    ChangeDetectionStrategy, ChangeDetectorRef,
    Component,
    ElementRef,
    forwardRef, HostListener,
    Input,
    OnChanges,
    OnInit, Renderer2, ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW, UP_ARROW } from '@angular/cdk/keycodes';

import { applyCssClass, CssClassBuilder } from '@fundamental-ngx/core';

export const SLIDER_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SliderComponent),
    multi: true
};

export interface RangeSliderValue {
    min: number;
    max: number
}

@Component({
    selector: 'fd-slider',
    templateUrl: './slider.component.html',
    styleUrls: ['./slider.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [SLIDER_VALUE_ACCESSOR]
})
export class SliderComponent implements OnInit, OnChanges, ControlValueAccessor, CssClassBuilder {
    /** User's custom classes */
    @Input()
    class: string;

    /** Id of the element that labels object number. */
    @Input()
    ariaLabelledBy: string = null;

    /** Aria label for the object number. */
    @Input()
    ariaLabel: string = null;

    /** Minimum value. */
    @Input()
    min = 0;

    /** Maximum value. */
    @Input()
    max = 100;

    /** Step value. */
    @Input()
    step = 1;

    /** Jump value. */
    @Input()
    jump = 10;

    /** Jump value. */
    @Input()
    mode: 'single' | 'range' = 'single';

    /** Toggles the visibility of tick marks. */
    @Input()
    showTicks = false;

    /** Toggles the visibility of tick mark labels. Must be used in conjunction with 'showTicks '*/
    @Input()
    showTicksLabels = false;

    /** Hides display of colored progress bar. */
    @Input()
    hideProgressBar = false;

    /** Whether the control is disabled. */
    @Input()
    disabled = false;

    /** Whether the control is readonly . */
    @Input()
    readonly = false;

    @Input()
    get value(): number {
        return this._value;
    }

    set value(val: number) {
        if (this.value === val) {
            return;
        }

        if (val > this.max) {
            return;
        }

        if (val < this.min) {
            return;
        }

        this._progress = ((val - this.min) / (this.max - this.min)) * 100;
        console.log('progress', this._progress);

        this._value = val;
        this.onChange(val);
        this.onTouched();
        this._cdr.markForCheck();
    }

    @ViewChild('track', { read: ElementRef }) trackEl: ElementRef<any>;

    _value = 0;
    _progress = 0;
    _isRange = false;
    _rangeValue: RangeSliderValue = { min: 0, max: 0 };
    _tickMarks: any[] = [];

    private _isHandleMoving = false;

    /** @hidden */
    constructor(
        private _elementRef: ElementRef,
        private _cdr: ChangeDetectorRef,
        private _renderer: Renderer2
    ) {
    }

    /** @hidden */
    ngOnChanges(): void {
        this.buildComponentCssClass();
        this._constructTickMarks();
        this._checkIsInRangeMode();
    }

    /** @hidden */
    ngOnInit(): void {
        this.buildComponentCssClass();
        this._constructTickMarks();
        this._checkIsInRangeMode();
    }

    @applyCssClass
    /** CssClassBuilder interface implementation
     * function must return single string
     * function is responsible for order which css classes are applied
     */
    buildComponentCssClass(): string[] {
        return [
            'fd-slider',
            this.class
        ];
    }

    /** @hidden */
    elementRef(): ElementRef<any> {
        return this._elementRef;
    }

    /** @hidden */
    onChange: Function = () => {
    };

    /** @hidden */
    onTouched: Function = () => {
    };

    /** @hidden */
    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    /** @hidden */
    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    /** @hidden */
    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
        // this.changeDetRef.detectChanges();
    }

    /** @hidden */
    writeValue(value: number): void {
        this.value = value;
    }

    /** @hidden */
    onTrackClick(event: MouseEvent): void {
        // console.log('track click, calc click position and change the value');
        this.writeValue(this._calculateValueFromPointerPosition(event));
        // console.log('value =', this.value, '%');
    }

    /** @hidden */
    onHandleClick(): void {
        console.log('drag start');
        this._isHandleMoving = true;
        const unsubscribeFromMousemove = this._renderer.listen('document', 'mousemove', event => {
            this.writeValue(this._calculateValueFromPointerPosition(event));
            // this._cdr.detectChanges();
        });
        const unsubscribeFromMouseup = this._renderer.listen('document', 'mouseup', event => {
            this.writeValue(this._calculateValueFromPointerPosition(event));
            unsubscribeFromMousemove();
            unsubscribeFromMouseup();
            // this._cdr.detectChanges();
        });
    }

    /** @hidden */
    @HostListener('keydown', ['$event'])
    onKeyDown(event: KeyboardEvent): void {
        event.preventDefault();
        const diff = event.shiftKey ? this.jump : this.step;
        let newValue: number | null = null;
        if (event.keyCode === LEFT_ARROW || event.keyCode === DOWN_ARROW) {
            newValue = this.value - diff;
        }

        if (event.keyCode === RIGHT_ARROW || event.keyCode === UP_ARROW) {
            newValue = this.value + diff;
        }

        if (newValue !== null) {
            if (newValue > this.max) {
                newValue = this.max;
            }

            if (newValue < this.min) {
                newValue = this.min;
            }

            this.value = newValue;
        }
    }

    /** @hidden */
    private _constructTickMarks(): void {
        const tickMarks = Array(Math.round((this.max - this.min) / this.jump) + 1).fill(null);
        let i = this.min;
        tickMarks.forEach((tick, _i) => {
            tickMarks[_i] = { value: i };
            if (i + this.jump > this.max) {
                return;
            }

            i += this.jump;
        });
        this._tickMarks = tickMarks;
        console.log('tick mark', tickMarks);
    }


    /** @hidden */
    private _calculateValueFromPointerPosition(event: MouseEvent): number {
        const { x, width } = this.trackEl.nativeElement.getBoundingClientRect();

        const percentage = ((event.clientX - x) / width);
        const newValue = this.min + percentage * (this.max - this.min);
        this._progress = percentage * 100;
        if (this._progress > 100) {
            this._progress = 100;

            return this.max;
        }
        if (this._progress < 0) {
            this._progress = 0;

            return this.min;
        }

        console.log('percentage', percentage);
        console.log('_progress', this._progress);
        console.log('value from percentage', newValue);

        return Math.round(newValue);
    }

    private _checkIsInRangeMode(): void {
        this._isRange = this.mode === 'range';
    }
}
