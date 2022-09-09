import { LiveAnnouncer } from '@angular/cdk/a11y';
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    forwardRef,
    HostBinding,
    HostListener,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Optional,
    Renderer2,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DOWN_ARROW, ENTER, LEFT_ARROW, RIGHT_ARROW, SPACE, UP_ARROW } from '@angular/cdk/keycodes';
import { coerceNumberProperty, _isNumberValue } from '@angular/cdk/coercion';

import { fromEvent, Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';

import {
    SliderControlValue,
    SliderCustomValue,
    SliderRangeHandles,
    SliderTickMark,
    SliderValueTargets
} from './slider.model';
import { RtlService, KeyUtil } from '@fundamental-ngx/core/utils';
import { Nullable } from '@fundamental-ngx/core/shared';

export const SLIDER_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SliderComponent),
    multi: true
};

let sliderId = 0;

@Component({
    selector: 'fn-slider',
    templateUrl: './slider.component.html',
    styleUrls: ['./slider.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [SLIDER_VALUE_ACCESSOR],
    host: {
        class: 'fn-slider'
    }
})
export class SliderComponent implements OnInit, OnChanges, OnDestroy, ControlValueAccessor {
    /** Slider id, it has some default value if not set.  */
    @Input()
    @HostBinding('attr.id')
    id = 'fn-slider-id-' + sliderId++;

    @Input()
    @HostBinding('class.fn-slider--range')
    range = false;

    /** Whether slider is disabled */
    @Input()
    @HostBinding('class.is-disabled')
    disabled = false;

    /** Id of the element that labels slider. */
    @Input()
    ariaLabelledBy: Nullable<string>;

    /** Aria-label for the slider. */
    @Input()
    ariaLabel: Nullable<string>;

    /** Get Minimum value. */
    @Input()
    get min(): number {
        return this._min;
    }

    /** Set Minimum value. */
    set min(value: number) {
        const newValue = coerceNumberProperty(value, this._min);
        if (((this.max - newValue) / this.step) % 1 !== 0) {
            return;
        }

        this._min = value;
    }

    /** Get Maximum value. */
    @Input()
    get max(): number {
        return this._max;
    }

    /** Set Maximum value. */
    set max(value: number) {
        const newValue = coerceNumberProperty(value, this._max);
        if (((newValue - this.min) / this.step) % 1 !== 0) {
            return;
        }

        this._max = value;
    }

    /** Get Step value. */
    @Input()
    get step(): number {
        return this._step;
    }

    /** Set Step value. */
    set step(value: number) {
        const newValue = coerceNumberProperty(value, this._step);
        if (((this.max - this.min) / newValue) % 1 !== 0) {
            return;
        }

        this._step = value;
    }

    /** Jump value. When using keyboard arrows and shift, it will be used instead of step */
    @Input()
    get jump(): number {
        return this._jump;
    }

    /** Set Jump value. */
    set jump(value: number) {
        this._jump = coerceNumberProperty(value, this._jump);
    }

    /** Put a label on every N-th tickmark. */
    @Input()
    get tickmarksBetweenLabels(): number {
        return this._tickmarksBetweenLabels;
    }

    /** Set Tickmarks Between Labels value. */
    set tickmarksBetweenLabels(value: number) {
        this._tickmarksBetweenLabels = coerceNumberProperty(value, this._tickmarksBetweenLabels);
    }

    /** Array of custom values to use for Slider. */
    @Input()
    customValues: SliderCustomValue[] = [];

    /**
     * Slider min/max value verbose string.
     */
    @Input()
    ariaValuePrefix = 'value is ';

    /**
     * slider current value verbose string.
     * This will be read only once by screen reader and upon slider value change,
     * this string will not be read.
     */
    @Input()
    singleSliderCurrentValuePrefix = 'Current value is ';

    /**
     * Range slider handle 1 current value supporting string
     * This will be read only once by screen reader and upon slider value change,
     * this string will not be read.
     */
    @Input()
    rangeSliderHandle1CurrentValuePrefix = 'handle 1 value is ';

    /**
     * Range slider handle 2 current value supporting string
     * This will be read only once by screen reader and upon slider value change,
     * this string will not be read.
     */
    @Input()
    rangeSliderHandle2CurrentValuePrefix = 'handle 2 value is ';

    /** @hidden */
    _position: number | number[] = 0;

    /** Control value */
    @Input()
    get value(): SliderControlValue {
        return this._value;
    }

    /** Set control value */
    set value(value: SliderControlValue) {
        if (!this._isValidControlValue(value, this.value)) {
            return;
        }

        if (this.range) {
            this._initRangeMode((value ?? [0.0]) as number[] | SliderTickMark[]);
        } else {
            this._initSingeMode((value ?? 0) as number | SliderTickMark);
        }

        this._initSingeMode(value as number | SliderTickMark);

        this._value = value;

        this.onChange(value);
        this.onTouched();
    }

    /** @hidden */
    get _popoverValueRef(): number[] {
        return [this._position as number, this._handle1Value, this._handle2Value];
    }

    /** @hidden */
    @ViewChild('rangeHandle1', { read: ElementRef })
    rangeHandle1: ElementRef<HTMLElement>;

    /** @hidden */
    @ViewChild('rangeHandle2', { read: ElementRef })
    rangeHandle2: ElementRef<HTMLElement>;

    /** @hidden */
    _value: number | SliderTickMark | SliderTickMark[] | number[] = 0;

    /** @hidden */
    _progress = 0;

    /** @hidden */
    _tickMarks: SliderTickMark[] = [];

    /** @hidden */
    _sliderValueTargets = SliderValueTargets;

    /** @hidden */
    _isRtl = false;

    /**
     * @hidden
     * whether to use value with a prefix for announcing
     */
    _useSliderValuePrefix = true;

    /** @hidden */
    _handle1Position = 0;

    /** @hidden */
    _handle2Position = 0;

    /** @hidden */
    _handle1Value = 0;

    /** @hidden */
    _handle2Value = 0;

    /** @hidden */
    _rangeProgress = 0;

    /** @hidden */
    private _min = 0;

    /** @hidden */
    private _max = 100;

    /** @hidden */
    private _step = 1;

    /** @hidden */
    private _jump = 10;

    /** @hidden */
    private _tickmarksBetweenLabels = 1;

    /** @hidden */
    private _valuesBySteps: number[] = [];

    /**
     * @hidden
     * An RxJS Subject that will kill the data stream upon component’s destruction (for unsubscribing)
     */
    private readonly _onDestroy$: Subject<void> = new Subject<void>();

    /** @hidden */
    constructor(
        private readonly _elementRef: ElementRef,
        private readonly _cdr: ChangeDetectorRef,
        private readonly _renderer: Renderer2,
        private readonly _liveAnnouncer: LiveAnnouncer,
        @Optional() private readonly _rtlService: RtlService
    ) {}

    @HostListener('click', ['$event'])
    onSliderClick(event: MouseEvent): void {
        this.onTrackClick(event);
    }

    /** @hidden */
    ngOnInit(): void {
        this._subscribeToRtl();
        this._attachResizeListener();
        this._onResize();

        if (this._valuesBySteps.length === 0) {
            this._constructValuesBySteps();
        }
    }

    /** @hidden */
    ngOnChanges(): void {
        this._constructValuesBySteps();
        this._recalcHandlePositions();
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._onDestroy$.next();
        this._onDestroy$.complete();
    }

    /** @hidden */
    private isRtl(): boolean {
        return this._rtlService?.rtl.getValue();
    }

    /** @hidden */
    getValuenow(position: number | number[], sliderValueTarget: SliderValueTargets): string | number {
        return this.customValues.length > 0
            ? this.customValues[position as number].label
            : this._popoverValueRef[sliderValueTarget];
    }

    /** @hidden */
    get minValue(): string | number {
        return this.customValues.length > 0 ? this.customValues[this.min as number].label : this.min;
    }

    /** @hidden */
    get maxValue(): string | number {
        return this.customValues.length > 0 ? this.customValues[this.max as number].label : this.max;
    }

    /** @hidden */
    elementRef(): ElementRef {
        return this._elementRef;
    }

    /** @hidden */
    onChange: (value: SliderControlValue) => void = () => {};

    /** @hidden */
    onTouched = (): void => {};

    /** @hidden */
    registerOnChange(fn: (value: SliderControlValue) => void): void {
        this.onChange = fn;
    }

    /** @hidden */
    registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    /** @hidden */
    writeValue(value: SliderControlValue): void {
        this.value = value;
    }

    /** @hidden */
    onTrackClick(event: MouseEvent): void {
        if (this.disabled || this.range) {
            return;
        }
        this.writeValue(this._calculateValueFromPointerPosition(event));
    }

    /** @hidden */
    onHandleClick(event: MouseEvent): void {
        event.stopPropagation();
        const unsubscribeFromMousemove = this._renderer.listen('document', 'mousemove', (moveEvent) => {
            if (!this.range) {
                this.writeValue(this._calculateValueFromPointerPosition(moveEvent));
                return;
            }

            let handleIndex = SliderRangeHandles.First;

            if (event.target === this.rangeHandle2.nativeElement) {
                handleIndex = SliderRangeHandles.Second;
            }

            const value = this._calculateValueFromPointerPosition(moveEvent, false) as number;
            this._setRangeHandleValueAndPosition(handleIndex, value);

            this.writeValue(this._constructRangeModelValue());
        });

        const unsubscribeFromMouseup = this._renderer.listen('document', 'mouseup', () => {
            unsubscribeFromMousemove();
            unsubscribeFromMouseup();
        });
    }

    /** @hidden */
    onKeyDown(event: KeyboardEvent): void {
        const allowedKeys: number[] = [LEFT_ARROW, RIGHT_ARROW, UP_ARROW, DOWN_ARROW, ENTER, SPACE];
        if (!KeyUtil.isKeyCode(event, allowedKeys)) {
            return;
        }
        event.preventDefault();

        const diff = event.shiftKey ? this.jump : this.step;
        let newValue: number | SliderTickMark | null = null;
        let prevValue = this._position as number;
        let handleIndex = SliderRangeHandles.First;

        if (this.range) {
            if (event.target === this.rangeHandle2.nativeElement) {
                prevValue = this._handle2Value;
                handleIndex = SliderRangeHandles.Second;
            }
        }

        if (this.isRtl()) {
            if (KeyUtil.isKeyCode(event, LEFT_ARROW) || KeyUtil.isKeyCode(event, UP_ARROW)) {
                newValue = prevValue + diff;
            }

            if (KeyUtil.isKeyCode(event, RIGHT_ARROW) || KeyUtil.isKeyCode(event, DOWN_ARROW)) {
                newValue = prevValue - diff;
            }
        } else {
            if (KeyUtil.isKeyCode(event, LEFT_ARROW) || KeyUtil.isKeyCode(event, DOWN_ARROW)) {
                newValue = prevValue - diff;
            }

            if (KeyUtil.isKeyCode(event, RIGHT_ARROW) || KeyUtil.isKeyCode(event, UP_ARROW)) {
                newValue = prevValue + diff;
            }
        }

        if (newValue === null) {
            return;
        }

        newValue = this._processNewValue(newValue as number, !this.range);

        if (!this.range) {
            this.writeValue(newValue);
        } else {
            this._setRangeHandleValueAndPosition(handleIndex, newValue as number);
            this.writeValue(this._constructRangeModelValue());
        }
    }

    /** @hidden reset default prefix on leaving the slider */
    onBlur(): void {
        // reset prefix string for slider current value that need to be announced
        this._useSliderValuePrefix = true;
        this._cdr.markForCheck();
    }

    /** @hidden */
    private _calculateValueFromPointerPosition(event: MouseEvent, takeCustomValue = true): number | SliderTickMark {
        const { left, width } = this._elementRef.nativeElement.getBoundingClientRect();
        const coordinates = event.clientX;
        const offset = left;
        const size = width;
        let percentage = (coordinates - offset) / size;

        if (this._isRtl) {
            percentage = 1 - percentage;
        }

        const newValue = this.min + percentage * (this.max - this.min);

        return this._processNewValue(newValue, takeCustomValue);
    }

    /** @hidden */
    private _processNewValue(newValue: number, takeCustomValue = true): number | SliderTickMark {
        if (newValue > this.max) {
            newValue = this.max;
        }

        if (newValue < this.min) {
            newValue = this.min;
        }

        this._useSliderValuePrefix = false;
        this._cdr.markForCheck();

        const stepDiffArray = this._valuesBySteps
            .map((stepValue) => ({ diff: Math.abs(stepValue - newValue), value: stepValue }))
            .sort((a, b) => a.diff - b.diff);
        let value: SliderTickMark | number = stepDiffArray[0].value;

        if (takeCustomValue && this.customValues.length > 0) {
            value = this.customValues[value];
        }

        return value;
    }

    /** @hidden */
    private _attachResizeListener(): void {
        fromEvent(window, 'resize')
            .pipe(debounceTime(500), takeUntil(this._onDestroy$))
            .subscribe(() => this._onResize());
    }

    /** @hidden */
    private _onResize(): void {
        this._cdr.markForCheck();
    }

    /** @hidden */
    private _constructValuesBySteps(): void {
        try {
            this._valuesBySteps = Array.from({ length: (this.max - this.min) / this.step + 1 }, (_, i) =>
                Number((this.min + i * this.step).toFixed(2))
            );
        } catch (e) {}
    }

    /** @hidden */
    private _calcProgress(value: number, skipRtl = false): number {
        let progress = ((value - this.min) / (this.max - this.min)) * 100;

        if (!skipRtl && this._isRtl) {
            progress = 100 - progress;
        }

        if (progress > 100) {
            return 100;
        }

        if (progress < 0) {
            return 0;
        }

        return progress;
    }

    /** @hidden */
    private _recalcHandlePositions(): void {
        if (this.range) {
            this._handle1Position = this._calcProgress(this._handle1Value);
            this._handle2Position = this._calcProgress(this._handle2Value);
            this._rangeProgress = Math.abs(this._handle2Position - this._handle1Position);
        }

        this._progress = this._calcProgress(this._position as number, true);
    }

    /** @hidden Rtl change subscription */
    private _subscribeToRtl(): void {
        if (!this._rtlService) {
            return;
        }

        this._rtlService.rtl.pipe(takeUntil(this._onDestroy$)).subscribe((isRtl: boolean) => {
            this._isRtl = isRtl;
            this._cdr.markForCheck();
        });
    }

    /** @hidden */
    private _isValidControlValue(currentValue: SliderControlValue, previousValue: SliderControlValue): boolean {
        if (!currentValue && currentValue !== 0) {
            return false;
        }

        if (_isNumberValue(currentValue)) {
            currentValue = coerceNumberProperty(currentValue);
        }

        return previousValue !== currentValue;
    }

    /** @hidden */
    private _initSingeMode(value: number | SliderTickMark): void {
        if (this.customValues.length > 0) {
            this._initSingeModeWithCustomValue(value as SliderTickMark);

            return;
        }

        this._initSingeModeDefault(coerceNumberProperty(value, this.min));
    }

    /** @hidden */
    private _initSingeModeDefault(value: number): void {
        this._position = value;

        this._progress = this._calcProgress(value, true);
    }

    /** @hidden */
    private _initSingeModeWithCustomValue(sliderTickMark: SliderTickMark): void {
        const value = (this._getCustomValuesPosition(sliderTickMark) as number) || this.min;

        this._initSingeModeDefault(value);
    }

    /** @hidden */
    private _getCustomValuesPosition(value: SliderTickMark | SliderTickMark[]): number | number[] {
        this.min = 0;
        this.max = this.customValues.length - 1;
        this.step = 1;

        return this._getCustomValuesPositions(value);
    }

    /** @hidden */
    private _getCustomValuesPositions(value: SliderTickMark | SliderTickMark[]): number | number[] {
        if (!value || (value as SliderTickMark[]).length === 0) {
            return 0;
        }

        if (Array.isArray(value)) {
            let [firstHandle, secondHandle] = value;
            if (!this._instanceOfCustomValue(firstHandle)) {
                firstHandle = this.customValues[0];
            }

            if (!this._instanceOfCustomValue(secondHandle)) {
                secondHandle = this.customValues[this.customValues.length - 1];
            }

            const firstHandlePosition = this.customValues.findIndex((item) => item.value === firstHandle.value);
            const secondHandlePosition = this.customValues.findIndex((item) => item.value === secondHandle.value);

            const indexes = [
                firstHandlePosition >= 0 ? firstHandlePosition : 0,
                secondHandlePosition >= 0 ? secondHandlePosition : this.customValues.length - 1
            ];

            return indexes;
        } else {
            let firstHandle = value as SliderTickMark;
            if (!this._instanceOfCustomValue(firstHandle)) {
                firstHandle = this.customValues[0];
            }

            return this.customValues.findIndex((item) => item.value === firstHandle.value) || 0;
        }
    }

    /** @hidden */
    private _instanceOfCustomValue(object: any): object is SliderCustomValue {
        return !!object && 'value' in object && 'label' in object;
    }

    /** @hidden */
    private _setRangeHandleValueAndPosition(handleIndex: SliderRangeHandles, value: number): void {
        const position = this._calcProgress(value, true);

        if (handleIndex === SliderRangeHandles.First) {
            this._handle1Value = value;
            this._handle1Position = position;
        }

        if (handleIndex === SliderRangeHandles.Second) {
            this._handle2Value = value;
            this._handle2Position = position;
        }

        this._rangeProgress = Math.abs(this._handle2Position - this._handle1Position);
    }

    /** @hidden */
    private _constructRangeModelValue(): number[] | SliderTickMark[] {
        let rangeLowerValue: number | string;
        let rangeHigherValue: number | string;
        let rangeValue: number[] | SliderTickMark[] = [
            Math.min(this._handle1Value, this._handle2Value),
            Math.max(this._handle1Value, this._handle2Value)
        ];

        rangeLowerValue = rangeValue[0];
        rangeHigherValue = rangeValue[1];

        if (this.customValues.length > 0) {
            const min = this.customValues[rangeValue[0]] || this.customValues[0];
            const max = this.customValues[rangeValue[1]] || this.customValues[this.customValues.length - 1];

            rangeValue = [min, max];
            rangeLowerValue = rangeValue[0].label;
            rangeHigherValue = rangeValue[1].label;
        }
        this._liveAnnouncer.announce('range value between ' + rangeLowerValue + ' and ' + rangeHigherValue, 'polite');
        return rangeValue;
    }

    /** @hidden */
    private _initRangeMode(value: number[] | SliderTickMark[]): void {
        const firstHandle = coerceNumberProperty(value[0], this.min);
        const secondHandle = coerceNumberProperty(value[1], this.max);

        this._initRangeModeDefault([firstHandle, secondHandle]);
    }

    /** @hidden */
    private _initRangeModeDefault([firstHandle, secondHandle]: number[]): void {
        this._position = [firstHandle, secondHandle];

        this._setRangeHandleValueAndPosition(SliderRangeHandles.First, firstHandle);
        this._setRangeHandleValueAndPosition(SliderRangeHandles.Second, secondHandle);
    }
}
