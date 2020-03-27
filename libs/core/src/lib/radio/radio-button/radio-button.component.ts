import {
    ChangeDetectorRef,
    Component,
    ElementRef,
    forwardRef,
    Input,
    ViewChild,
    ChangeDetectionStrategy,
    OnChanges,
    OnInit
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { applyCssClass, CssClassBuilder } from '../../utils/public_api';

export type stateType = 'valid' | 'invalid' | 'warning' | 'default' | 'information';
let uniqueId = 0;
@Component({
    selector: 'fd-radio-button',
    templateUrl: './radio-button.component.html',
    styleUrls: ['./radio-button.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => RadioButtonComponent),
            multi: true
        }
    ]
})
export class RadioButtonComponent implements OnChanges, OnInit, CssClassBuilder, ControlValueAccessor {
    /** @hidden */
    class: string;

    /** @hidden */
    @ViewChild('inputElement')
    inputElement: ElementRef;

    /** @hidden */
    actualValue: any;

    /** Whether to apply compact mode to the radio button.
     * Value: true or false
     * By default field is set to false
     */
    @Input()
    compact: boolean;

    /** The field to set state of radio button using:
     * 'valid' | 'invalid' | 'warning' | 'default' | 'information'
     * by default value is set to 'default'
     */
    @Input()
    state: stateType;

    /** The field is used to tell if radio button should be disabled
     * Value: true or false
     * by default disabled state is set to false
     */
    @Input()
    disabled: boolean;

    /** The field should be only used with reactive forms
     * Its purpose is to pass a current selected value from froumGroup
     * The field is mandatory when working with reactive forms
     */
    @Input()
    selectedValue: any;

    /** The name of the radio button
     * The field is mandatory
     */
    @Input()
    name: string;

    /**
     * uniqueId to a radio button
     */
    @Input()
    id: string = `radio-id-${uniqueId++}`;

    /** Value field stores information about holding value by radio button
     * The field is mandatory
     */
    @Input()
    value: any;

    get checked(): boolean {
        if (this.value === undefined) {
            return false;
        }
        return this.actualValue === this.value;
    }

    /** @hidden */
    constructor(private changeDetectionRef: ChangeDetectorRef) { }

    /** @hidden */
    ngOnChanges(): void {
        this.buildComponentCssClass();
        this._checkMandatoryFields();
    }

    /** @hidden */
    ngOnInit(): void {
        this.buildComponentCssClass();
        this._checkMandatoryFields();
    }

    // ControlValueAccessor implementation
    /** @hidden */
    onChange: any = () => { };

    /** @hidden */
    onTouched: any = () => { };

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
        this.valueChange(value);
    }
    // End implementation

    @applyCssClass
    /** This method is responsible for building a css class based on current state
     *  It is implementation of CssClassBuilder interface and
     *  should be used with @applyCssClass decorator
     */
    buildComponentCssClass(): string {
        return [
            'fd-radio',
            this.compact ? 'fd-radio--compact' : '',
            this.state !== 'default' ? `is-${this.state}` : ''
        ].join(' ');
    }

    /** @hidden */
    elementRef(): ElementRef<any> {
        return this.inputElement;
    }

    /** @hidden */
    labelClicked(): void {
        this.valueChange(this.value);
        this._setFocusOnNativeElement();
    }

    /** @hidden */
    valueChange(value: any): void {
        this.actualValue = value;

        this._setNativeElementCheckedState();

        this.changeDetectionRef.detectChanges();
        this.onChange(value);
    }

    /** @hidden */
    private _checkMandatoryFields(): void {
        if (this.name === undefined) {
            throw 'name field is required';
        }
        if (this.value === undefined) {
            throw 'value field is required';
        }
    }

    /** @hidden */
    private _setFocusOnNativeElement(): void {
        if (this.inputElement) {
            this.inputElement.nativeElement.focus();
        }
    }

    /** @hidden */
    private _setNativeElementCheckedState(): void {
        if (this.inputElement) {
            this.inputElement.nativeElement.checked = this.checked;
        }
    }
}
