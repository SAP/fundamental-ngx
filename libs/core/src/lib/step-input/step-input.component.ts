import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    forwardRef,
    Inject,
    Input,
    LOCALE_ID,
    OnInit,
    Output,
    ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormStates } from '../form/form-control/form-states';
import { KeyUtil } from '../..';
import NumberFormat = Intl.NumberFormat;

@Component({
    selector: 'fd-step-input',
    templateUrl: './step-input.component.html',
    styleUrls: ['./step-input.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => StepInputComponent),
            multi: true
        }
    ]
})
export class StepInputComponent implements OnInit, ControlValueAccessor {

    @Input()
    compact: boolean;

    @Input()
    locale: string;

    @Input()
    localeMatcher: string;

    @Input()
    incrementButtonIcon: string = 'add';

    @Input()
    decrementButtonIcon: string = 'less';

    @Input()
    incrementButtonTitle: string;

    @Input()
    decrementButtonTitle: string;

    @Input()
    ariaLabel: string;

    @Input()
    inputId: boolean;

    @Input()
    value: number = 0;

    @Input()
    min: number;

    @Input()
    max: number;

    @Input()
    step: number = 1;

    @Input()
    name: boolean;

    @Input()
    inputTitle: string;

    @Input()
    maxLength: string;

    @Input()
    unit: string;

    // Intl.NumberFormat
    @Input()
    useGrouping: boolean = true;

    @Input()
    minFractionDigits: number;

    @Input()
    maxFractionDigits: number;

    @Input()
    state: FormStates;

    @Input()
    currency: string;

    @Input()
    currencyDisplay: string;

    @Input()
    mode: string = 'decimal';

    @Output()
    valueChange: EventEmitter<number> = new EventEmitter<number>();

    @Output()
    onFocus: EventEmitter<void> = new EventEmitter<void>();

    @Output()
    onBlur: EventEmitter<void> = new EventEmitter<void>();

    viewValue: string;

    onChange: Function = () => {};

    onTouched: Function = () => {};

    constructor(@Inject(LOCALE_ID) locale) {
        this.locale = locale;
        console.log(locale);
    }

    ngOnInit(): void {
        this._updateViewValue();
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    writeValue(value: number): void {
        value = Number(value);
        if (!isNaN(value)) {
            this.value = value;
            this._updateViewValue();
        }
    }

    increment(): void {
        if (this.value + this.step < this._max) {
            this.value += this.step;
            this._updateViewValue();
            this.emitChangedValue();
        }
    }

    decrement(): void {
        if (this.value - this.step > this._min) {
            this.value -= this.step;
            this._updateViewValue();
            this.emitChangedValue();
        }
    }

    onKeyDown(event: KeyboardEvent) {
        console.log(event);
        if (KeyUtil.isKey(event, 'ArrowUp')) {
            this.increment();
        } else if (KeyUtil.isKey(event, 'ArrowDown')) {
            this.decrement();
        } else if (KeyUtil.isKeyType(event, 'numeric')) {
        }
        event.stopPropagation();
        event.preventDefault();
    }

    onInputValueChange(target: any) {
        // this.value = value;
        // this.emitChangedValue(this.value);
    }

    private _updateViewValue(): void {
        this.viewValue = this._numberFormat.format(this.value);
    }

    private emitChangedValue(): void {
        this.valueChange.emit(this.value);
        this.onChange(this.value);
    }

    private get _max(): number {
        return !isNaN(this.max) ? this.max : Number.MAX_VALUE;
    }

    private get _min(): number {
        return !isNaN(this.min) ? this.min : -Number.MAX_VALUE;
    }

    private get _numberFormat(): NumberFormat {
        return new NumberFormat(this.locale, {
            localeMatcher: this.localeMatcher,
            style: this.mode,
            currency: this.currency,
            currencyDisplay: this.currencyDisplay,
            useGrouping: this.useGrouping,
            minimumFractionDigits: this.minFractionDigits,
            maximumFractionDigits: this.maxFractionDigits
        })
    }
}
