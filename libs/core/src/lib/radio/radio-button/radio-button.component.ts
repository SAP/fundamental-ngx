import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    forwardRef,
    Input,
    OnChanges,
    OnDestroy,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subscription } from 'rxjs';
import { applyCssClass, CssClassBuilder } from '@fundamental-ngx/cdk/utils';
import { Nullable } from '@fundamental-ngx/cdk/utils';
import { registerFormItemControl, FormItemControl } from '@fundamental-ngx/core/form';
import { ContentDensityObserver, contentDensityObserverProviders } from '@fundamental-ngx/core/content-density';

export type stateType = 'success' | 'error' | 'warning' | 'default' | 'information';
let uniqueId = 0;

@Component({
    selector: 'fd-radio-button',
    templateUrl: './radio-button.component.html',
    styleUrls: ['./radio-button.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => RadioButtonComponent),
            multi: true
        },
        registerFormItemControl(RadioButtonComponent),
        contentDensityObserverProviders()
    ],
    host: {
        '(focusout)': 'onTouched()'
    }
})
export class RadioButtonComponent
    implements OnChanges, AfterViewInit, CssClassBuilder, ControlValueAccessor, OnDestroy, FormItemControl
{
    /** @hidden */
    @ViewChild('inputElement')
    inputElement: ElementRef;

    /** Sets the `aria-label` attribute to the element. */
    @Input()
    ariaLabel: Nullable<string>;

    /** Sets the `aria-labelledby` attribute to the element. */
    @Input()
    ariaLabelledBy: Nullable<string>;

    /** Sets the `aria-describedby` attribute to the element. */
    @Input()
    ariaDescribedBy: Nullable<string>;

    /** sets radio tooltip */
    @Input()
    title: string;

    /**
     * Includes the radio in the page tab sequence.
     */
    @Input()
    tabIndex: number;

    /** The field to set state of radio button using:
     * 'success' | 'error' | 'warning' | 'default' | 'information'
     * by default value is set to 'default'
     */
    @Input()
    state?: stateType = 'default';

    /** The field is used to tell if radio button should be disabled
     * Value: true or false
     * by default disabled state is set to false
     */
    @Input()
    disabled = false;

    /** The field should be only used with reactive forms
     * Its purpose is to pass a current selected value from froumGroup
     * The field is mandatory when working with reactive forms
     */
    @Input()
    set selectedValue(val: any) {
        this.currentValue = val;
        this._setNativeElementCheckedState();
    }

    /** The name of the radio button
     * The field is mandatory
     */
    @Input()
    name: string;

    /**
     * uniqueId to a radio button
     */
    @Input()
    id = `radio-id-${uniqueId++}`;

    /** Value field stores information about holding value by radio button
     * The field is mandatory
     */
    @Input()
    value: any;

    /** If it is mandatory field */
    @Input()
    required = false;

    /** Whether the radio button is checked. */
    get checked(): boolean {
        if (this.value === undefined) {
            return false;
        }
        return this.currentValue === this.value;
    }

    /** @hidden */
    class: string;

    /** @hidden */
    currentValue: any;

    /** @hidden */
    private _subscriptions = new Subscription();

    /** @hidden */
    constructor(
        private changeDetectionRef: ChangeDetectorRef,
        readonly _contentDensityObserver: ContentDensityObserver
    ) {}

    /** @hidden */
    ngOnDestroy(): void {
        this._subscriptions.unsubscribe();
    }

    /** @hidden */
    ngOnChanges(): void {
        this.buildComponentCssClass();
        this._checkMandatoryFields();
    }

    /** @hidden */
    ngAfterViewInit(): void {
        this.buildComponentCssClass();
        this._checkMandatoryFields();
    }

    // ControlValueAccessor implementation
    /** @hidden */
    onChange: any = (): void => {};

    /** @hidden */
    onTouched: any = (): void => {};

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
        this.changeDetectionRef.detectChanges();
    }

    /** @hidden */
    writeValue(value: any): void {
        this.valueChange(value, false);
    }

    // End implementation

    /** This method is responsible for building a css class based on current state
     *  It is implementation of CssClassBuilder interface and
     *  should be used with @applyCssClass decorator
     */
    @applyCssClass
    buildComponentCssClass(): string[] {
        return ['fd-radio', this.state !== 'default' ? `is-${this.state}` : ''];
    }

    /** @hidden */
    elementRef(): ElementRef<any> {
        return this.inputElement;
    }

    /** @hidden */
    labelClicked(event: MouseEvent | KeyboardEvent, applyFocus = true): void {
        this.valueChange(this.value);

        if (applyFocus) {
            this._setFocusOnNativeElement();
        }

        event.stopPropagation();
    }

    /** @hidden */
    valueChange(value: any, emitEvent = true): void {
        this.currentValue = value;

        this._setNativeElementCheckedState();

        this.changeDetectionRef.detectChanges();
        if (emitEvent) {
            this.onChange(value);
        }
    }

    /** @hidden */
    private _checkMandatoryFields(): void {
        if (this.name === undefined) {
            throw new Error('name field is required');
        }
        if (this.value === undefined) {
            throw new Error('value field is required');
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
