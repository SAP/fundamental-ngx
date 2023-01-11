import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    Host,
    Inject,
    Input,
    isDevMode,
    Optional,
    Output,
    Self,
    SkipSelf,
    TemplateRef,
    ViewChild
} from '@angular/core';
import { ControlContainer, NgControl, NgForm } from '@angular/forms';
import { FocusableOption } from '@angular/cdk/a11y';

import { RadioButtonComponent as CoreRadioButtonComponent } from '@fundamental-ngx/core/radio';
import { BaseInput, PlatformFormFieldControl, PlatformFormField } from '@fundamental-ngx/platform/shared';
import { FormStates } from '@fundamental-ngx/cdk/forms';
import { FD_FORM_FIELD, FD_FORM_FIELD_CONTROL } from '@fundamental-ngx/cdk/forms';

let uniqueId = 0;

@Component({
    selector: 'fdp-radio-button',
    templateUrl: './radio.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RadioButtonComponent extends BaseInput implements AfterViewInit, FocusableOption {
    /** sets radio button tooltip */
    @Input()
    title: string;

    /**
     * Includes the Radio in the page tab sequence.
     */
    @Input()
    tabIndex = -1;

    /** value for Radio button */
    @Input()
    set value(newValue: any) {
        this._value = newValue;
    }
    get value(): any {
        return super.getValue();
    }

    /**
     * @deprecated
     * set state of individual radio.Used by RBG to set radio states
     */
    @Input()
    set stateType(state: FormStates) {
        if (isDevMode()) {
            console.warn('"stateType" is deprecated. Use "state" instead');
        }
        super.state = state;
    }
    get stateType(): FormStates {
        if (isDevMode()) {
            console.warn('"stateType" is deprecated. Use "state" instead');
        }
        return super.state;
    }

    /** used for radio button creation if list value present */
    @Input()
    forceRender = false;

    /** reference of template */
    @ViewChild('renderer')
    renderer: TemplateRef<any>;

    /** @hidden */
    _currentValue: any;

    /** @hidden Radio checked status */
    _isChecked = false;

    /** click event to emit */
    @Output()
    readonly checked: EventEmitter<RadioButtonComponent> = new EventEmitter();

    /** Access radio button child element passed as content of radio button group */
    @ViewChild(CoreRadioButtonComponent, { static: false })
    private coreRadioButton: CoreRadioButtonComponent;

    /** @hidden */
    constructor(
        cd: ChangeDetectorRef,
        elementRef: ElementRef,
        @Optional() @Self() ngControl: NgControl,
        @Optional() @SkipSelf() controlContainer: ControlContainer,
        @Optional() @SkipSelf() ngForm: NgForm,
        @Optional() @SkipSelf() @Host() @Inject(FD_FORM_FIELD) formField: PlatformFormField,
        @Optional() @SkipSelf() @Host() @Inject(FD_FORM_FIELD_CONTROL) formControl: PlatformFormFieldControl
    ) {
        super(cd, elementRef, ngControl, controlContainer, ngForm, formField, formControl);

        if (this.ngControl) {
            this.ngControl.valueAccessor = this;
        }
        // @hidden have to set default initial values as base class has check and throws error
        this.id = `fdp-radio-id-${uniqueId}`;
        this.name = `fdp-radio-name-${uniqueId}`;
        uniqueId++;
    }

    /** @hidden Controlvalue accessor */
    writeValue(value: any): void {
        this._valueChange(value);
    }

    /** @hidden */
    ngAfterViewInit(): void {
        super.ngAfterViewInit();
    }

    /** @hidden */
    _valueChange(value: any, emitEvent = false): void {
        if (this.disabled) {
            emitEvent = false;
        }

        this._currentValue = value;
        this._isChecked = this._currentValue === super.getValue();
        if (this._isChecked && emitEvent) {
            this.checked.emit(this);
        }
        this.tabIndex = this._isChecked ? 0 : -1;
        this._cd.detectChanges();
        if (emitEvent) {
            this.onChange(value);
            this.onTouched();
        }
    }

    /** method for cdk FocusKeymanager */
    focus(): void {
        this.coreRadioButton?.elementRef().nativeElement.focus();
    }

    /** method to select radio button */
    select(): void {
        this._valueChange(super.getValue());
    }

    /** method to uncheck radio button */
    unselect(): void {
        this._valueChange(undefined);
    }

    /** Setting tabIndex for radio accessibility */
    setTabIndex(index: 0 | -1): void {
        this.tabIndex = index;
        this._cd.markForCheck();
    }
}
