import {
    ChangeDetectorRef,
    Component,
    ElementRef,
    forwardRef,
    Input,
    ViewChild,
    ChangeDetectionStrategy,
    OnChanges,
    ViewEncapsulation,
    AfterViewInit,
    OnDestroy
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subscription } from 'rxjs';
import { KeyUtil } from '@fundamental-ngx/cdk/utils';
import { TAB } from '@angular/cdk/keycodes';

export type stateType = 'success' | 'error' | 'warning' | 'default' | 'information';
let radioUniqueId = 0;
@Component({
    selector: 'fn-radio-button',
    templateUrl: './radio-button.component.html',
    styleUrls: ['./radio-button.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => RadioButtonComponent),
            multi: true
        }
    ]
})
export class RadioButtonComponent implements OnChanges, AfterViewInit, ControlValueAccessor, OnDestroy {
    /** @hidden */
    @ViewChild('inputElement')
    inputElement: ElementRef;

    /** Sets the `aria-label` attribute to the element. */
    @Input()
    ariaLabel = null;

    /** Sets the `aria-labelledby` attribute to the element. */
    @Input()
    ariaLabelledBy = null;

    /** Sets the `aria-describedby` attribute to the element. */
    @Input()
    ariaDescribedBy: string;

    /** sets radio tooltip */
    @Input()
    title: string;

    /**
     * Includes the radio in the page tab sequence.
     */
    @Input()
    tabIndex: number;

    /** The field is used to tell if radio button should be disabled
     * Value: true or false
     * by default disabled state is set to false
     */
    @Input()
    disabled = false;

    /**
     * If the radio button is used inside a group.
     * If set to true the control will take the width of the parent container.
     */
    @Input()
    isGroup: boolean;

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
     * radioUniqueId to a radio button
     */
    @Input()
    id = `fn-radio-${radioUniqueId++}`;

    /** Value field stores information about holding value by radio button
     * The field is mandatory
     */
    @Input()
    value: any;

    /** If it is mandatory field */
    @Input()
    required = false;

    get checked(): boolean {
        if (this.value === undefined) {
            return false;
        }
        return this.currentValue === this.value;
    }

    /** @hidden */
    currentValue: any;

    /** @hidden */
    private _subscriptions = new Subscription();

    /** @hidden */
    constructor(private changeDetectionRef: ChangeDetectorRef) {}

    /** @hidden */
    ngOnDestroy(): void {
        this._subscriptions.unsubscribe();
    }

    /** @hidden */
    ngOnChanges(): void {
        this._checkMandatoryFields();
    }

    /** @hidden */
    ngAfterViewInit(): void {
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
        this.valueChange(value);
    }

    /** @hidden */
    elementRef(): ElementRef<any> {
        return this.inputElement;
    }

    /** @hidden */
    labelClicked(event: MouseEvent | KeyboardEvent): void {
        if (this.disabled) {
            return;
        }
        this.valueChange(this.value);
        this._setFocusOnNativeElement();
        event.stopPropagation();
    }

    /** @hidden */
    valueChange(value: any): void {
        this.currentValue = value;

        this._setNativeElementCheckedState();

        this.changeDetectionRef.detectChanges();
        this.onChange(value);
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

    /** Handles tab key event */
    keydownHandler(event: KeyboardEvent): void {
        if (KeyUtil.isKeyCode(event, TAB)) {
            return;
        }
        this.labelClicked(event);
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
