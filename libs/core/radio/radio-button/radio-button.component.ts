import { coerceNumberProperty, NumberInput } from '@angular/cdk/coercion';
import {
    AfterViewInit,
    booleanAttribute,
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
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { applyCssClass, CssClassBuilder, Nullable } from '@fundamental-ngx/cdk/utils';
import { ContentDensityObserver, contentDensityObserverProviders } from '@fundamental-ngx/core/content-density';
import { FormItemControl, registerFormItemControl } from '@fundamental-ngx/core/form';
import { Subscription } from 'rxjs';
import { FD_RADIO_BUTTON_COMPONENT } from '../tokens';

export type stateType = 'success' | 'error' | 'warning' | 'default' | 'information';
let uniqueId = 0;

@Component({
    selector: 'fd-radio-button',
    templateUrl: './radio-button.component.html',
    styleUrl: './radio-button.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => RadioButtonComponent),
            multi: true
        },
        {
            provide: FD_RADIO_BUTTON_COMPONENT,
            useExisting: RadioButtonComponent
        },
        registerFormItemControl(RadioButtonComponent),
        contentDensityObserverProviders()
    ],
    host: {
        '(focusout)': 'onTouched()'
    },
    imports: [FormsModule]
})
export class RadioButtonComponent<T = any>
    implements OnChanges, AfterViewInit, CssClassBuilder, ControlValueAccessor, OnDestroy, FormItemControl
{
    /** @hidden */
    @ViewChild('inputElement')
    inputElement: ElementRef<HTMLInputElement>;

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
    set tabIndex(value: NumberInput) {
        this._tabIndex = coerceNumberProperty(value);
    }

    get tabIndex(): NumberInput {
        return this._tabIndex;
    }

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

    /** The field is used to tell if radio button should be read only */
    @Input()
    readOnly = false;

    /** The field should be only used with reactive forms
     * Its purpose is to pass a current selected value from froumGroup
     * The field is mandatory when working with reactive forms
     */
    @Input()
    set selectedValue(val: T) {
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
    value: T;

    /** If it is a mandatory field */
    @Input()
    required = false;

    /** Whether the control is a standalone. */
    @Input()
    standalone = false;

    /** Whether input label should be wrapped */
    @Input({ transform: booleanAttribute }) wrapLabel: boolean;

    /** Vertical position of the label compared to the radio button */
    @Input() valignLabel: 'top' | 'middle' = 'middle';

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
    currentValue: T;

    /** @hidden */
    private _tabIndex: number;

    /** @hidden */
    private _subscriptions = new Subscription();

    /** @hidden */
    constructor(
        private changeDetectionRef: ChangeDetectorRef,
        readonly _contentDensityObserver: ContentDensityObserver
    ) {}

    /** This method is responsible for building a css class based on current state
     *  It is implementation of CssClassBuilder interface and
     *  should be used with @applyCssClass decorator
     */
    @applyCssClass
    buildComponentCssClass(): string[] {
        return ['fd-radio', this.state !== 'default' ? `is-${this.state}` : ''];
    }

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

    /** @hidden */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onChange = (value: T): void => {};

    /** @hidden */
    onTouched = (): void => {};

    /** @hidden */
    registerOnChange(fn: (value: T) => void): void {
        this.onChange = fn;
    }

    /** @hidden */
    registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    /** @hidden */
    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
        this.changeDetectionRef.detectChanges();
    }

    /** @hidden */
    setReadonlyState(isReadonly: boolean): void {
        this.readOnly = isReadonly;
        this.changeDetectionRef.detectChanges();
    }

    /** @hidden */
    writeValue(value: T): void {
        this.valueChange(value, false);
    }

    // End implementation

    /** @hidden */
    get elementRef(): ElementRef {
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
    valueChange(value: T, emitEvent = true): void {
        this.currentValue = value;

        this._setNativeElementCheckedState();

        this.changeDetectionRef.detectChanges();
        if (emitEvent) {
            this.onChange(value);
        }
    }

    /** @hidden */
    private _checkMandatoryFields(): void {
        if (this.standalone) {
            return;
        }
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
