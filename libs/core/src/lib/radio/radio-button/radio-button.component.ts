import { ChangeDetectorRef, Component, ElementRef, forwardRef, Input, ViewChild, AfterViewInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { applyCssClass, CssClassBuilder } from '../../utils/public_api';

export type stateType = 'valid' | 'invalid' | 'warning' | 'default' | 'information';
@Component({
    selector: 'fd-radio-button',
    templateUrl: './radio-button.component.html',
    styleUrls: ['./radio-button.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => RadioButtonComponent),
            multi: true
        }
    ]
})
export class RadioButtonComponent implements AfterViewInit, CssClassBuilder, ControlValueAccessor {
    class: string;

    @ViewChild('inputElement', { static: false })
    inputElement: ElementRef;

    /** @hidden */
    actualValue: any;

    private _compact: boolean = false;
    @Input() set compact(isCompact: boolean) {
        this._compact = isCompact;
        this.buildComponentCssClass();
    }

    private _state: stateType = 'default';
    @Input() set state(newState: stateType) {
        this._state = newState;
        this.buildComponentCssClass();
    }

    private _disabled: boolean = false;
    @Input() set disabled(isDisabled: boolean) {
        this._disabled = isDisabled;
        this.buildComponentCssClass();
    }

    @Input() id: string;

    @Input() name: string;

    @Input() value: any;

    /** @hidden */
    onChange: any = (selected: any) => {};

    /** @hidden */
    onTouched: any = () => {};

    /** @hidden */
    constructor(private changeDetectionRef: ChangeDetectorRef) {}

    // ControlValueAccessor implementation
    /** @hidden */
    registerOnChange(fn: (selected: any) => { void }): void {
        this.onChange = fn;
    }

    /** @hidden */
    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    /** @hidden */
    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
        this.changeDetectionRef.detectChanges();
    }

    /** @hidden */
    writeValue(value: any): void {
        this.actualValue = value;
    }
    // End implementation

    /** @hidden */
    labelClicked(): void {
        this.valueChange(this.value);
        this.inputElement.nativeElement.focus();
    }

    /** @hidden */
    valueChange(value: any): void {
        this.actualValue = value;
        this.onChange(value);
    }

    ngAfterViewInit(): void {
        this.buildComponentCssClass();
    }

    // this method is going to be updated when PR #1770 will be merged
    /** @hidden */
    @applyCssClass
    buildComponentCssClass(): string {
        return [
            'fd-radio',
            this._compact ? 'fd-radio--compact' : '',
            this._state !== 'default' ? `is-${this._state}` : ''
        ].join(' ');
    }

    elementRef(): ElementRef<any> {
        return this.inputElement;
    }
}
