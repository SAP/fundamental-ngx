import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    forwardRef,
    HostBinding,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Optional,
    QueryList,
    Renderer2,
    ViewChild,
    ViewChildren,
    ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DOWN_ARROW, ENTER, LEFT_ARROW, RIGHT_ARROW, SPACE, UP_ARROW } from '@angular/cdk/keycodes';
import { Platform } from '@angular/cdk/platform';
import { coerceNumberProperty } from '@angular/cdk/coercion';
import { LiveAnnouncer } from '@angular/cdk/a11y';

import { BehaviorSubject, combineLatest, fromEvent, Observable, of, Subject } from 'rxjs';
import {
    debounceTime,
    distinctUntilChanged,
    map,
    mapTo,
    skip,
    startWith,
    switchMap,
    take,
    takeUntil
} from 'rxjs/operators';

import { PopoverComponent } from '@fundamental-ngx/core/popover';
import { Nullable } from '@fundamental-ngx/core/shared';
import {
    SliderControlValue,
    SliderCustomValue,
    SliderRangeHandles,
    SliderTickMark,
    SliderValueTargets
} from './slider.model';
import { MIN_DISTANCE_BETWEEN_TICKS } from './constants';
import { applyCssClass, CssClassBuilder, KeyUtil, RtlService } from '@fundamental-ngx/core/utils';
import { FormItemControl, registerFormItemControl } from '@fundamental-ngx/core/form';
import {
    ContentDensityMode,
    ContentDensityObserver,
    contentDensityObserverProviders
} from '@fundamental-ngx/core/content-density';
import { SkeletonConsumerDirective, skeletonConsumerProviders } from '@fundamental-ngx/core/skeleton';

export const SLIDER_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SliderComponent),
    multi: true
};

let sliderId = 0;

@Component({
    selector: 'fd-slider',
    templateUrl: './slider.component.html',
    styleUrls: ['./slider.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        SLIDER_VALUE_ACCESSOR,
        registerFormItemControl(SliderComponent),
        contentDensityObserverProviders({
            defaultContentDensity: ContentDensityMode.COMPACT,
            modifiers: { [ContentDensityMode.COZY]: 'fd-slider--lg' }
        }),
        skeletonConsumerProviders()
    ],
    host: {
        '(mouseenter)': 'this._componentHovered$.next(true)',
        '(mouseleave)': 'this._componentHovered$.next(false)'
    }
})
export class SliderComponent
    implements OnInit, OnChanges, AfterViewInit, OnDestroy, ControlValueAccessor, CssClassBuilder, FormItemControl
{
    /** Slider id, it has some default value if not set,  */
    @Input()
    @HostBinding('attr.id')
    id = 'fd-slider-id-' + sliderId++;

    /** User's custom classes */
    @Input()
    class: string;

    /** Id of the element that labels slider. */
    @Input()
    ariaLabelledBy: Nullable<string>;

    /** Aria label for the slider. */
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

    /** Jump value. */
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

    /**
     * Slider mode.
     * Options include: 'single' | 'range'
     * The default is set to 'single'
     */
    @Input()
    mode: 'single' | 'range' = 'single';

    /** Toggles the visibility of tick marks. */
    @Input()
    showTicks = false;

    /** Toggles the visibility of tick mark labels. Must be used in conjunction with 'showTicks' */
    @Input()
    showTicksLabels = false;

    /** Array of custom values to use for Slider. */
    @Input()
    customValues: SliderCustomValue[] = [];

    /** Tooltip can be two types, 'readonly' to display value and 'editable' to make the ability to set and display value. */
    @Input()
    tooltipMode: 'readonly' | 'editable';

    /** Hides display of colored progress bar. */
    @Input()
    hideProgressBar = false;

    /** Whether the control is disabled. */
    @Input()
    disabled = false;

    /**
     * slider current value verbose string.
     * This will be read only once by screen reader and upon slider value change,
     * this string will not be read.
     * @deprecated no longer used, use i18n capabilities instead
     */
    @Input()
    singleSliderCurrentValuePrefix: string;

    /**
     * @hidden range slider handle 1 current value supporting string
     * This will be read only once by screen reader and upon slider value change,
     * this string will not be read.
     * * @deprecated no longer used, use i18n capabilities instead
     */
    @Input()
    rangeSliderHandle1CurrentValuePrefix: string;

    /**
     * @hidden range slider handle 2 current value supporting string
     * This will be read only once by screen reader and upon slider value change,
     * this string will not be read.
     * * @deprecated no longer used, use i18n capabilities instead
     */
    @Input()
    rangeSliderHandle2CurrentValuePrefix: string;

    _position: number | number[] = 0;

    /** Control value */
    @Input()
    get value(): SliderControlValue {
        return this._value;
    }

    /** Set control value */
    set value(value: SliderControlValue) {
        this._setValue(value);
    }

    /** @hidden */
    get _popoverValueRef(): number[] {
        return [this._position as number, this._handle1Value, this._handle2Value];
    }

    /** @hidden */
    @ViewChild('track', { read: ElementRef })
    trackEl: ElementRef<HTMLDivElement>;

    /** @hidden */
    @ViewChild('handle', { read: ElementRef })
    handle: ElementRef<HTMLDivElement>;

    /** @hidden */
    @ViewChild('rangeHandle1', { read: ElementRef })
    rangeHandle1: ElementRef<HTMLDivElement>;

    /** @hidden */
    @ViewChild('rangeHandle2', { read: ElementRef })
    rangeHandle2: ElementRef<HTMLDivElement>;

    /** @hidden */
    @ViewChildren(PopoverComponent)
    _popovers: QueryList<PopoverComponent>;

    /** @hidden */
    @ViewChildren('sliderTooltipWrapper')
    _sliderTooltipWrappers: QueryList<ElementRef<HTMLDivElement>>;

    /** @hidden */
    _value: number | SliderTickMark | SliderTickMark[] | number[] = 0;

    /** @hidden */
    _progress = 0;

    /** @hidden */
    @HostBinding('class.fd-slider--range')
    _isRange = false;

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
    _tickMarks: SliderTickMark[] = [];

    /** @hidden */
    _sliderValueTargets = SliderValueTargets;

    /** @hidden */
    _popoverInputFieldClass = `fd-slider-popover-input-${sliderId}`;

    /** @hidden */
    _isRtl = false;

    /**
     * @hidden
     * whether to use value with a prefix for announcing
     */
    _useSliderValuePrefix = true;

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
    readonly _componentHovered$ = new BehaviorSubject(false);

    /** @hidden */
    readonly _handleFocused$ = new BehaviorSubject(false);

    /** @hidden */
    readonly _rangeHandle1Focused$ = new BehaviorSubject(false);

    /** @hidden */
    readonly _rangeHandle2Focused$ = new BehaviorSubject(false);

    /** @hidden */
    readonly _popoverInputFieldFocused$ = new BehaviorSubject(false);

    /** @hidden */
    readonly _popoverInputFieldHovered$ = new BehaviorSubject(false);

    /** @hidden */
    constructor(
        private readonly _elementRef: ElementRef,
        private readonly _cdr: ChangeDetectorRef,
        private readonly _renderer: Renderer2,
        private readonly _platform: Platform,
        private readonly _liveAnnouncer: LiveAnnouncer,
        @Optional() private readonly _rtlService: RtlService,
        readonly _contentDensityObserver: ContentDensityObserver,
        private readonly _skeletonConsumer: SkeletonConsumerDirective
    ) {
        _contentDensityObserver.subscribe();
        _skeletonConsumer.consume();
    }

    /** @hidden */
    ngOnInit(): void {
        this._subscribeToRtl();
        this._attachResizeListener();
        this._onResize();

        if (this._valuesBySteps.length === 0) {
            this._constructValuesBySteps();
        }

        this.buildComponentCssClass();
    }

    /** @hidden */
    ngOnChanges(): void {
        this.buildComponentCssClass();
        this._checkIsInRangeMode();
        this._constructTickMarks();
        this._constructValuesBySteps();
        this._recalcHandlePositions();
    }

    /** @hidden */
    ngAfterViewInit(): void {
        this._listenToInteractionChanges();
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

    @applyCssClass
    /**
     * @hidden
     * CssClassBuilder interface implementation
     * function must return single string
     * function is responsible for order which css classes are applied
     */
    buildComponentCssClass(): string[] {
        return [
            'fd-slider',
            this.disabled ? 'is-disabled' : '',
            this._isRange ? 'fd-slider--range' : '',
            this.showTicks && this.showTicksLabels ? 'fd-slider--with-labels' : '',
            this.class,
            this._platform.EDGE || this._platform.TRIDENT ? 'fd-slider__alternative-tick-width' : ''
        ];
    }

    /** @hidden */
    elementRef(): ElementRef<any> {
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
    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    /** @hidden */
    writeValue(value: SliderControlValue): void {
        this._setValue(value, false);
    }

    /** @hidden */
    onTrackClick(event: MouseEvent): void {
        if (this.disabled || this._isRange) {
            return;
        }

        this._setValue(this._calculateValueFromPointerPosition(event));
        this._updatePopoversPosition();
    }

    /** @hidden */
    onHandleClick(event: MouseEvent): void {
        if (this.disabled) {
            return;
        }

        const unsubscribeFromMousemove = this._renderer.listen('document', 'mousemove', (moveEvent) => {
            this._updatePopoversPosition();

            if (!this._isRange) {
                this._setValue(this._calculateValueFromPointerPosition(moveEvent));

                return;
            }

            let handleIndex: SliderRangeHandles;
            if (event.target === this.rangeHandle1.nativeElement) {
                handleIndex = SliderRangeHandles.First;
            } else if (event.target === this.rangeHandle2.nativeElement) {
                handleIndex = SliderRangeHandles.Second;
            } else {
                return;
            }

            const value = this._calculateValueFromPointerPosition(moveEvent, false) as number;
            this._setRangeHandleValueAndPosition(handleIndex, value);

            this._setValue(this._constructRangeModelValue());
        });

        const unsubscribeFromMouseup = this._renderer.listen('document', 'mouseup', () => {
            unsubscribeFromMousemove();
            unsubscribeFromMouseup();
        });
    }

    /** @hidden */
    onKeyDown(event: KeyboardEvent): void {
        if (this.disabled) {
            return;
        }

        const allowedKeys: number[] = [LEFT_ARROW, RIGHT_ARROW, UP_ARROW, DOWN_ARROW, ENTER, SPACE];
        if (!KeyUtil.isKeyCode(event, allowedKeys)) {
            return;
        }
        event.preventDefault();

        const diff = event.shiftKey ? this.jump : this.step;
        let newValue: number | SliderTickMark | null = null;
        let prevValue = this._position as number;
        let handleIndex: SliderRangeHandles | undefined;
        if (this._isRange) {
            if (event.target === this.rangeHandle1.nativeElement) {
                prevValue = this._handle1Value;
                handleIndex = SliderRangeHandles.First;
            } else if (event.target === this.rangeHandle2.nativeElement) {
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

        newValue = this._processNewValue(newValue as number, !this._isRange);

        if (!this._isRange) {
            this._setValue(newValue);
        } else if (handleIndex) {
            this._setRangeHandleValueAndPosition(handleIndex, newValue as number);
            this._setValue(this._constructRangeModelValue());
        }

        this._updatePopoversPosition();
    }

    /** @hidden */
    _updateValueFromInput(value: string, target: SliderValueTargets): void {
        const newValue = this._processNewValue(+value) as number;
        if (!this._isRange && target === SliderValueTargets.SINGLE_SLIDER) {
            this._setValue(newValue);
            this.handle.nativeElement.focus();
            this._updatePopoversPosition();

            return;
        }

        if (target === SliderValueTargets.RANGE_SLIDER1) {
            this._setRangeHandleValueAndPosition(SliderRangeHandles.First, newValue);
            this.rangeHandle1.nativeElement.focus();
        }

        if (target === SliderValueTargets.RANGE_SLIDER2) {
            this._setRangeHandleValueAndPosition(SliderRangeHandles.Second, newValue);
            this.rangeHandle2.nativeElement.focus();
        }

        this._setValue(this._constructRangeModelValue());

        this._updatePopoversPosition();
    }

    /** @hidden */
    private _setValue(value: SliderControlValue, emitEvent = true): void {
        if (this._isRange) {
            this._initRangeMode((value ?? [0.0]) as number[] | SliderTickMark[]);
        } else {
            this._initSingeMode((value ?? 0) as number | SliderTickMark);
        }

        this._value = value;

        if (emitEvent) {
            this.onChange(value);
            this.onTouched();
        }
        this._cdr.markForCheck();
    }

    /** @hidden */
    private _updatePopoversPosition(): void {
        this._cdr.detectChanges();

        this._popovers.forEach((popover) => popover.refreshPosition());
    }

    /** @hidden */
    private _calculateValueFromPointerPosition(event: MouseEvent, takeCustomValue = true): number | SliderTickMark {
        const { left, width } = this.trackEl.nativeElement.getBoundingClientRect();
        let percentage = (event.clientX - left) / width;

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
    private _attachResizeListener(): void {
        fromEvent(window, 'resize')
            .pipe(debounceTime(500), takeUntil(this._onDestroy$))
            .subscribe(() => this._onResize());
    }

    /** @hidden */
    private _onResize(): void {
        this._constructTickMarks();
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
    private _constructTickMarks(): void {
        if (!this.showTicks) {
            this._tickMarks = [];

            return;
        }

        if (this.customValues.length) {
            this.min = 0;
            this.max = this.customValues.length - 1;
            this.step = 1;
            const customValuesLength = this.customValues.length - 1;
            this._tickMarks = this.customValues.map((item, i) => ({
                ...item,
                position: (100 / customValuesLength) * i
            }));
        } else {
            const total = this.max - this.min;
            const tickMarksCount = total / this.step + 1;
            if (this._maxTickMarksNumber !== undefined && tickMarksCount > this._maxTickMarksNumber) {
                this._tickMarks = [
                    { position: 0, value: 0, label: `${this.min}` },
                    { position: 100, value: total, label: `${this.max}` }
                ];

                return;
            }

            if (tickMarksCount % 1 === 0) {
                this._tickMarks = Array.from({ length: tickMarksCount }, (_, i) => {
                    const value = Math.round(i * this.step * 100) / 100;
                    const position = (value / (this.max - this.min)) * 100;

                    return { value, position, label: `${this.min + value}` };
                });
            }
        }
    }

    /** @hidden */
    private get _maxTickMarksNumber(): number | undefined {
        if (!this.trackEl || !this.trackEl.nativeElement) {
            return;
        }

        return Math.floor(this.trackEl.nativeElement.getBoundingClientRect().width / MIN_DISTANCE_BETWEEN_TICKS);
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
        if (this._isRange) {
            this._handle1Position = this._calcProgress(this._handle1Value);
            this._handle2Position = this._calcProgress(this._handle2Value);
            this._rangeProgress = Math.abs(this._handle2Position - this._handle1Position);
        }

        this._progress = this._calcProgress(this._position as number, true);
    }

    /** @hidden */
    private _checkIsInRangeMode(): void {
        this._isRange = this.mode === 'range';
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
    private _initRangeMode(value: number[] | SliderTickMark[]): void {
        if (this.customValues.length > 0) {
            this._initRangeModeWithCustomValues(value as SliderTickMark[]);

            return;
        }

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

    /** @hidden */
    private _initRangeModeWithCustomValues([firstHandle, secondHandle]: SliderTickMark[]): void {
        const value = this._getCustomValuesPosition([firstHandle, secondHandle]) || [this.min, this.max];

        this._initRangeModeDefault(value as number[]);
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
            return this._isRange ? [0, this.customValues.length - 1] : 0;
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
    private _listenToInteractionChanges(): void {
        combineLatest([
            this._handleFocused$,
            this._rangeHandle1Focused$,
            this._rangeHandle2Focused$,
            this._popoverInputFieldFocused$,
            this._componentHovered$,
            this._popoverInputFieldHovered$
        ])
            .pipe(
                skip(1),
                map((states) => states.some(Boolean)),
                switchMap((focused) => {
                    if (focused) {
                        return of(true);
                    }
                    // If not focused, check for the edge case,
                    // when hover is on the fd-popover-body, that is a parent for the tooltip.
                    // This will return true, when hovering the gap between handle and the tooltip.
                    return this._isPopoverHovered();
                }),
                debounceTime(10),
                distinctUntilChanged(),
                takeUntil(this._onDestroy$)
            )
            .subscribe((focused) => {
                if (focused) {
                    this._popovers.forEach((popover) => popover.open());
                } else {
                    this._resetPrefix();
                    this._popovers.forEach((popover) => popover.close());
                }
            });
    }

    /** @hidden reset default prefix on leaving the slider */
    private _resetPrefix(): void {
        // reset prefix string for slider current value that need to be announced
        this._useSliderValuePrefix = true;
        this._cdr.markForCheck();
    }

    /**
     * @hidden
     * Checks whether input popover element is hovered.
     * Will also return true, when hovering the gap between handle and the tooltip.
     * If yes, returns "true" instantly and "false" once it's not hovered anymore.
     */
    private _isPopoverHovered(): Observable<boolean> {
        const popoverBody = this._sliderTooltipWrappers.first?.nativeElement.closest('fd-popover-body');
        if (popoverBody?.matches(':hover')) {
            return fromEvent(popoverBody, 'mouseleave').pipe(mapTo(false), take(1), startWith(true));
        }
        return of(false);
    }
}
