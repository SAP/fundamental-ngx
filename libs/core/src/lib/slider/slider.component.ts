import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component, ContentChildren,
    ElementRef,
    forwardRef, HostBinding,
    Input,
    OnChanges, OnDestroy,
    OnInit, QueryList, Renderer2, ViewChild, ViewChildren,
    ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW, TAB, UP_ARROW } from '@angular/cdk/keycodes';

import { applyCssClass, CssClassBuilder, PopoverDirective } from '@fundamental-ngx/core';
import { fromEvent, Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';

export const SLIDER_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SliderComponent),
    multi: true
};

export interface RangeSliderValue {
    min: number;
    max: number
}

export enum SliderValueTargets {
    SINGLE_SLIDER,
    RANGE_SLIDER1,
    RANGE_SLIDER2
}

export enum RangeHandleIndex {
    First,
    Second
}

let sliderId = 0;

@Component({
    selector: 'fd-slider',
    templateUrl: './slider.component.html',
    styleUrls: ['./slider.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [SLIDER_VALUE_ACCESSOR]
})
export class SliderComponent implements OnInit, OnChanges, OnDestroy, AfterViewInit, ControlValueAccessor, CssClassBuilder {
    /** Slider id, it has some default value if not set,  */
    @Input()
    @HostBinding('attr.id')
    id = 'fd-slider-id-' + sliderId++;

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
        if (typeof val === 'string') {
            val = Number(val);
        }

        if (this.value === val) {
            return;
        }

        if (!this._isRange && (typeof val === 'number')) {
            this._progress = ((val - this.min) / (this.max - this.min)) * 100;
        }

        if (this._isRange && Array.isArray(val) && !(this._handle1Value && this._handle2Value)) {
            this._setRangeHandleValueAndPosition(RangeHandleIndex.First, val[0]);
            this._setRangeHandleValueAndPosition(RangeHandleIndex.Second, val[1]);
        }

        this._value = val;
        this.onChange(val);
        this.onTouched();
        this._cdr.markForCheck();
    }

    get popoverValueRef(): number[] {
        return [this.value as number, this._handle1Value, this._handle2Value];
    }

    @ViewChild('track', { read: ElementRef }) trackEl: ElementRef<any>;
    @ViewChild('tickLabelsContainer', { read: ElementRef }) tickLabelsContainer: ElementRef<any>;
    @ViewChild('tickMarksContainer', { read: ElementRef }) tickMarksContainer: ElementRef<any>;
    @ViewChild('handle', { read: ElementRef }) handle: ElementRef<any>;
    @ViewChild('rangeHandle1', { read: ElementRef }) rangeHandle1: ElementRef<any>;
    @ViewChild('rangeHandle2', { read: ElementRef }) rangeHandle2: ElementRef<any>;

    /** @hidden */
    @ViewChildren(PopoverDirective)
    _popovers: QueryList<PopoverDirective>;

    _value: number | number[] = 0;
    _progress = 0;
    _isRange = false;
    _handle1Position = 0;
    _handle2Position = 0;
    _handle1Value = 0;
    _handle2Value = 0;
    _rangeProgress = 0;
    _tickMarks: any[] = [];
    _stepValues: number[] = [];
    _isEnoughSpaceForTickMarks = false;
    _popoverInputFieldClass = `fd-slider-popover-input-${sliderId}`;

    /** An RxJS Subject that will kill the data stream upon component’s destruction (for unsubscribing)  */
    private readonly _onDestroy$: Subject<void> = new Subject<void>();

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
        // this._constructTickMarkLabels();
        this._checkIsInRangeMode();
    }

    /** @hidden */
    ngOnInit(): void {
        this.buildComponentCssClass();
        // this._constructTickMarkLabels();
        this._checkIsInRangeMode();
        this._attachResizeListener();
    }

    /** @hidden */
    ngAfterViewInit(): void {
        this._constructTickMarkLabels();
        this._constructStepValues();
        this._checkIfEnoughSpaceForTickMarks();
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._onDestroy$.next();
        this._onDestroy$.complete();
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
        this._updatePopoversPosition();
    }

    /** @hidden */
    onHandleClick(event: MouseEvent): void {
        const unsubscribeFromMousemove = this._renderer.listen('document', 'mousemove', moveEvent => {
            this._updatePopoversPosition();
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
        const allowedKeys = [LEFT_ARROW, RIGHT_ARROW, UP_ARROW, DOWN_ARROW];
        if (!allowedKeys.includes(event.keyCode)) {
            return;
        }

        event.preventDefault();
        const diff = event.shiftKey ? this.jump : this.step;
        let newValue: number | null = null;
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

        if (newValue === null) {
            return;
        }

        if (newValue > this.max) {
            newValue = this.max;
        }

        if (newValue < this.min) {
            newValue = this.min;
        }

        if (!this._isRange) {
            this.writeValue(newValue);
            this._updatePopoversPosition();
            return;
        }

        this._setRangeHandleValueAndPosition(handleIndex, newValue);
        this.writeValue(this._constructRangeModelValue());
        this._updatePopoversPosition();
        this._cdr.detectChanges();
    }

    /** @hidden */
    _showPopovers(): void {
        this._popovers.forEach(popover => popover.open());
    }

    /** @hidden */
    _hidePopovers(): void {
        const elementsToCheck = [this.handle?.nativeElement, this.rangeHandle1?.nativeElement, this.rangeHandle2?.nativeElement];
        if (elementsToCheck.some(el => document.activeElement === el) || document.activeElement.classList.contains(this._popoverInputFieldClass)) {
            const unsubscribeFromBlur = this._renderer.listen(document.activeElement, 'focusout', () => {
                setTimeout(() => {
                    unsubscribeFromBlur();
                    this._hidePopovers();
                });
            });
            return;
        }
        console.log('hiding popovers');
        this._popovers.forEach(popover => popover.close());
    }

    _updatePopoversPosition(): void {
        this._popovers.forEach(popover => popover.updatePopper());
    }

    _updateValueFromInput(value: string, target: SliderValueTargets): void {
        // console.log('_updateValueFromInput', value, target);
        if (!this._isRange && target === SliderValueTargets.SINGLE_SLIDER) {
            this.writeValue(+value);
            this.handle.nativeElement.focus();
            return;
        }
        if (target === SliderValueTargets.RANGE_SLIDER1) {
            this._setRangeHandleValueAndPosition(RangeHandleIndex.First, +value);
            this.rangeHandle1.nativeElement.focus();
        }
        if (target === SliderValueTargets.RANGE_SLIDER2) {
            this._setRangeHandleValueAndPosition(RangeHandleIndex.Second, +value);
            this.rangeHandle2.nativeElement.focus();
        }
        this.writeValue(this._constructRangeModelValue());
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

        const stepDiffArray = this._stepValues
            .map(stepValue => ({ diff: Math.abs(stepValue - newValue), value: stepValue }))
            .sort((a, b) => a.diff - b.diff);

        return Math.round(stepDiffArray[0].value);
    }


    private _setRangeHandleValueAndPosition(handleIndex: RangeHandleIndex, value: number): void {
        const position = ((value - this.min) / (this.max - this.min)) * 100;
        if (handleIndex === RangeHandleIndex.First) {
            this._handle1Value = value;
            this._handle1Position = position;
        }

        if (handleIndex === RangeHandleIndex.Second) {
            this._handle2Value = value;
            this._handle2Position = position;
        }

        this._rangeProgress = Math.abs(this._handle2Position - this._handle1Position);
    }

    private _constructRangeModelValue(): number[] {
        return [
            Math.min(this._handle1Value, this._handle2Value),
            Math.max(this._handle1Value, this._handle2Value)
        ];
    }

    private _attachResizeListener(): void {
        fromEvent(window, 'resize')
            .pipe(debounceTime(100), takeUntil(this._onDestroy$))
            .subscribe(() => this._checkIfEnoughSpaceForTickMarks());
    }

    private get _maxTickMarksNumber(): number {
        const { width } = this.trackEl.nativeElement.getBoundingClientRect();

        return Math.floor(width / 8);
    }

    private _checkIfEnoughSpaceForTickMarks(): void {
        this._isEnoughSpaceForTickMarks = this._tickMarks.length - 1 < this._maxTickMarksNumber;
        console.log('checking if there is enough space for tick marks... = ', this._isEnoughSpaceForTickMarks);
        this._cdr.detectChanges();
    }

    private _constructStepValues(): void {
        this._stepValues = Array(((this.max - this.min) / this.step) + 1)
            .fill({})
            .map((tickMark, i) => {
                return this.min + i * this.step;
            });
    }

    /** @hidden */
    private _constructTickMarkLabels(): void {
        console.log('_constructTickMarkLabels');
        console.log('maxTickMarksNumber', this._maxTickMarksNumber);
        if (this.customLabelsValues.length) {
            this._tickMarks = [...this.customLabelsValues];
        } else {
            // this._tickMarks = [{ value: this.min }, { value: this.max }];
            this._tickMarks =
                Array(((this.max - this.min) / this.step) + 1)
                    .fill({})
                    .map((tickMark, i) => {
                        return { value: this.min + i * this.step };
                    });
        }
        this._cdr.detectChanges();
        console.log('tick mark', this._tickMarks);
    }

    private _checkIsInRangeMode(): void {
        this._isRange = this.mode === 'range';
    }
}
