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
import { DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW, TAB, UP_ARROW } from '@angular/cdk/keycodes';

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

export enum RangeHandleIndex {
    First,
    Second
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

    /** Slider mode. */
    @Input()
    mode: 'single' | 'range' = 'single';

    /** Toggles the visibility of tick marks. */
    @Input()
    showTicks = false;

    /** Toggles the visibility of tick mark labels. Must be used in conjunction with 'showTicks' */
    @Input()
    showTicksLabels = false;

    /** Array of custom labels values to use for Slider. */
    @Input()
    customLabelsValues: string[] = [];

    /** Tooltip can be two types, 'readonly' to display value and 'editable' to make the ability to set and display value. */
    @Input()
    tooltipMode: 'readonly' | 'editable' = 'readonly';

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
    get value(): number | number[] {
        return this._value;
    }

    set value(val: number | number[]) {
        if (this.value === val) {
            return;
        }

        if (!this._isRange && typeof val === 'number') {
            this._progress = ((val - this.min) / (this.max - this.min)) * 100;
        }

        this._value = val;
        this.onChange(val);
        this.onTouched();
        this._cdr.markForCheck();
    }

    @ViewChild('track', { read: ElementRef }) trackEl: ElementRef<any>;
    @ViewChild('rangeHandle1', { read: ElementRef }) rangeHandle1: ElementRef<any>;
    @ViewChild('rangeHandle2', { read: ElementRef }) rangeHandle2: ElementRef<any>;

    _value: number | number[] = 0;
    _progress = 0;
    _isRange = false;
    _rangeValue: RangeSliderValue = { min: 0, max: 0 };
    _handle1Position = 0;
    _handle2Position = 0;
    _handle1Value = 0;
    _handle2Value = 0;
    _rangeProgress = 0;
    _tickMarks: any[] = [];

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
    }

    /** @hidden */
    writeValue(value: number | number[]): void {
        this.value = value;
    }

    /** @hidden */
    onTrackClick(event: MouseEvent): void {
        if (this._isRange) {
            return;
        }

        console.log('track click, calc click position and change the value');
        this.writeValue(this._calculateValueFromPointerPosition(event));
    }

    /** @hidden */
    onHandleClick(event: MouseEvent): void {
        const unsubscribeFromMousemove = this._renderer.listen('document', 'mousemove', moveEvent => {
            if (!this._isRange) {
                this.writeValue(this._calculateValueFromPointerPosition(moveEvent));
                return;
            }

            const value = this._calculateValueFromPointerPosition(moveEvent);
            let handleIndex: RangeHandleIndex;
            if (event.target === this.rangeHandle1.nativeElement) {
                handleIndex = RangeHandleIndex.First;
            }

            if (event.target === this.rangeHandle2.nativeElement) {
                handleIndex = RangeHandleIndex.Second;
            }

            this._setRangeHandleValueAndPosition(handleIndex, value);
            this.writeValue(this._constructRangeModelValue());
            this._cdr.detectChanges();
        });
        const unsubscribeFromMouseup = this._renderer.listen('document', 'mouseup', () => {
            console.log('UNSUBSCRIBE FROM MOUSEMOVE');
            unsubscribeFromMousemove();
            unsubscribeFromMouseup();
        });
    }

    /** @hidden */
    onKeyDown(event: KeyboardEvent): void {
        if (event.keyCode === TAB) {
            return;
        }

        event.preventDefault();
        const diff = event.shiftKey ? this.jump : this.step;
        let newValue: number;
        let prevValue = this.value as number;
        let handleIndex: RangeHandleIndex;
        if (this._isRange) {
            if (event.target === this.rangeHandle1.nativeElement) {
                prevValue = this._handle1Value;
                handleIndex = RangeHandleIndex.First;
            }

            if (event.target === this.rangeHandle2.nativeElement) {
                prevValue = this._handle2Value;
                handleIndex = RangeHandleIndex.Second;
            }
        }

        if (event.keyCode === LEFT_ARROW || event.keyCode === DOWN_ARROW) {
            newValue = prevValue - diff;
        }

        if (event.keyCode === RIGHT_ARROW || event.keyCode === UP_ARROW) {
            newValue = prevValue + diff;
        }

        if (newValue > this.max) {
            newValue = this.max;
        }

        if (newValue < this.min) {
            newValue = this.min;
        }

        if (!this._isRange) {
            this.writeValue(newValue);
            return;
        }

        this._setRangeHandleValueAndPosition(handleIndex, newValue);
        this.writeValue(this._constructRangeModelValue());
        this._cdr.detectChanges();
    }

    /** @hidden */
    private _calculateValueFromPointerPosition(event: MouseEvent): number {
        const { x, width } = this.trackEl.nativeElement.getBoundingClientRect();
        const percentage = ((event.clientX - x) / width);
        const newValue = this.min + percentage * (this.max - this.min);

        if (newValue > this.max) {
            return this.max;
        }

        if (newValue < this.min) {
            return this.min;
        }

        return Math.round(newValue);
    }


    private _setRangeHandleValueAndPosition(handleIndex: RangeHandleIndex, value: number): void {
        if (handleIndex === RangeHandleIndex.First) {
            this._handle1Value = value;
            this._handle1Position = ((value - this.min) / (this.max - this.min)) * 100;
        }

        if (handleIndex === RangeHandleIndex.Second) {
            this._handle2Value = value;
            this._handle2Position = ((value - this.min) / (this.max - this.min)) * 100;
        }

        this._rangeProgress = Math.abs(this._handle2Position - this._handle1Position);
    }

    private _constructRangeModelValue(): number[] {
        return [
            Math.min(this._handle1Value, this._handle2Value),
            Math.max(this._handle1Value, this._handle2Value)
        ];
    }

    /** @hidden */
    private _constructTickMarks(): void {
        console.log('_constructTickMarks');
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

    private _checkIsInRangeMode(): void {
        this._isRange = this.mode === 'range';
    }
}
