import {
    ChangeDetectorRef,
    Component,
    ElementRef,
    forwardRef,
    Input,
    ViewChild,
    ChangeDetectionStrategy,
    OnChanges
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
export class RadioButtonComponent implements OnChanges, CssClassBuilder, ControlValueAccessor {
    /** @hidden */
    class: string;

    /** @hidden */
    @ViewChild('inputElement')
    public inputElement: ElementRef;

    /** @hidden */
    public actualValue: any;

    /** Whether to apply compact mode to the radio button.
     * Value: true or false
     * By default field is set to false
     */
    @Input()
    public compact: boolean;

    /** The field to set state of radio button using:
     * 'valid' | 'invalid' | 'warning' | 'default' | 'information'
     * by default value is set to 'default'
     */
    @Input()
    public state: stateType;

    /** The field is used to tell if radio button should be disabled
     * Value: true or false
     * by default disabled state is set to false
     */
    @Input()
    public disabled: boolean;

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
    public name: string;

    /**
     * uniqueId to a radio button
     */
    @Input()
    public id: string = `radio-id-${uniqueId++}`;

    /** Value field stores information about holding value by radio button
     * The field is mandatory
     */
    @Input()
    public value: any;

    public get checked(): boolean {
        if (this.value === undefined) {
            return false;
        }
        return this.actualValue === this.value;
    }

    /** @hidden */
    constructor(private changeDetectionRef: ChangeDetectorRef) { }

    /** @hidden */
    public ngOnChanges(): void {
        this.buildComponentCssClass();
        this._checkMandatoryFields();
    }

    // ControlValueAccessor implementation
    /** @hidden */
    public onChange: any = () => { };

    /** @hidden */
    public onTouched: any = () => { };

    /** @hidden */
    public registerOnChange(fn: (selected: any) => { void }): void {
        this.onChange = fn;
    }

    /** @hidden */
    public registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    /** @hidden */
    public setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
        this.changeDetectionRef.detectChanges();
    }

    /** @hidden */
    public writeValue(value: any): void {
        this.valueChange(value);
    }
    // End implementation

    @applyCssClass
    /** This method is responsible for building a css class based on current state
     *  It is implementation of CssClassBuilder interface and
     *  should be used with @applyCssClass decorator
     */
    public buildComponentCssClass(): string {
        return [
            'fd-radio',
            this.compact ? 'fd-radio--compact' : '',
            this.state !== 'default' ? `is-${this.state}` : ''
        ].join(' ');
    }

    /** @hidden */
    public elementRef(): ElementRef<any> {
        return this.inputElement;
    }

    /** @hidden */
    public labelClicked(): void {
        this.valueChange(this.value);
        this._setFocusOnNativeElement();
    }

    /** @hidden */
    public valueChange(value: any): void {
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
