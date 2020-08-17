import {
    Component,
    EventEmitter,
    Input,
    Output,
    ViewChild,
    TemplateRef,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Optional,
    Self,
    SkipSelf,
    Host
} from '@angular/core';
import { NgForm, NgControl } from '@angular/forms';
import { FocusableOption } from '@angular/cdk/a11y';
import { RadioButtonComponent as CoreRadioButtonComponent, stateType } from '@fundamental-ngx/core';

import { BaseInput } from '../../base.input';
import { Status, FormFieldControl } from '../../form-control';
import { FormField } from '../../form-field';

let uniqueId = 0;

@Component({
    selector: 'fdp-radio-button',
    templateUrl: './radio.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RadioButtonComponent extends BaseInput implements AfterViewInit, FocusableOption {
    /**
     * Attached to the aria-label attribute of the host element. In most cases, aria-labelledby will
     * take precedence so this may be omitted.
     */
    @Input('aria-label')
    ariaLabel = '';

    /**
     * Users can specify the `aria-labelledby` attribute which will be forwarded to the input element
     */
    @Input('aria-labelledby')
    ariaLabelledby = null;

    /** The 'aria-describedby' attribute is read after the element's label and field type. */
    @Input('aria-describedby')
    ariaDescribedby: string;

    /** The 'aria-disabled' for giving accessibility for disabled radio button element. */
    @Input('aria-disabled')
    ariaDisabled: boolean;

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
    get value(): any {
        return this.getValue();
    }
    set value(newValue: any) {
        if (newValue) {
            this._value = newValue;
        }
    }

    /** set state of individual radio.Used by RBG to set radio states */
    @Input()
    stateType: Status;

    /** @hidden
     * used for radio button creation if list value present
     */
    @Input()
    forceRender = false;

    /** click event to emit */
    @Output()
    readonly click: EventEmitter<RadioButtonComponent> = new EventEmitter();

    /** Access radio button child elemen passed as content of radio button group*/
    @ViewChild(CoreRadioButtonComponent, { static: false })
    private coreRadioButton: CoreRadioButtonComponent;

    /** reference of template */
    @ViewChild('renderer')
    renderer: TemplateRef<any>;

    /** @hidden */
    currentValue: any;

    /** @hidden Radio checked status */
    isChecked = false;

    constructor(
        cd: ChangeDetectorRef,
        @Optional() @Self() ngControl: NgControl,
        @Optional() @SkipSelf() ngForm: NgForm,
        @Optional() @SkipSelf() @Host() formField: FormField,
        @Optional() @SkipSelf() @Host() formControl: FormFieldControl<any>
    ) {
        super(cd, ngControl, ngForm, formField, formControl);

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
        if (value) {
            this.valueChange(value);
        }
    }

    /** @hidden */
    ngAfterViewInit(): void {
        super.ngAfterViewInit();
    }

    /** @hidden change formcontrol value, emits the event*/
    public onClick(event: KeyboardEvent | MouseEvent): void {
        event.stopPropagation();
        if (!this.disabled) {
            if (super.getValue() !== undefined) {
                this.valueChange(this.value);
                this.click.emit(this);
            }
        }
    }

    /** @hidden */
    public valueChange(value: any): void {
        this.currentValue = value;
        this.isChecked = this.currentValue === this.getValue();
        this.tabIndex = this.isChecked ? 0 : -1;
        this._cd.detectChanges();
        this.onChange(value);
    }

    /** method for cdk FocusKeymanager */
    public focus(): void {
        if (this.coreRadioButton) {
            this.coreRadioButton.elementRef().nativeElement.focus();
        }
    }

    /** method to select radio button */
    public select(): void {
        this.valueChange(this.getValue());
    }

    /** method to uncheck radio button */
    public unselect(): void {
        this.valueChange(undefined);
    }

    /** Setting tabIndex for radio accessibility */
    public setTabIndex(index: 0 | -1): void {
        this.tabIndex = index;
        this._cd.markForCheck();
    }
}
