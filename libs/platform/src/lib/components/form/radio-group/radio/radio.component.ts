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
export class RadioButtonComponent extends BaseInput implements FocusableOption {
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

    /** The 'aria-disabled' for giving accessibility for disabled checkbox element. */
    @Input('aria-disabled')
    ariaDisabled: boolean;

    /** sets checkbox tooltip */
    @Input()
    title: string;

    /**
     * Includes the checkbox in the page tab sequence.
     */
    @Input()
    tabIndex = -1;

    /** value for Radio button */
    @Input()
    get value(): any {
        return super.getValue();
    }
    set value(newValue: any) {
        if (super.getValue() !== newValue) {
            super.setValue(newValue);
        }
    }

    /** set status value */
    set status(newStatus: Status) {
        this._status = newStatus;
        this.state = newStatus;
        this._cd.markForCheck();
    }

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

    state: Status | stateType = 'default';

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
        this.id = `radio-id-${uniqueId++}`;
        this.name = `radio-id-${uniqueId++}`;
    }

    /** @hidden change formcontrol value, emits the event*/
    public onClick(event: KeyboardEvent | MouseEvent): void {
        event.stopPropagation();
        if (!this.disabled) {
            if (super.getValue() !== undefined) {
                this.onChange(super.getValue());
                this.click.emit(this);
            }
        }
    }

    public focus(): void {
        if (this.coreRadioButton) {
            this.coreRadioButton.elementRef().nativeElement.focus();
        }
    }

    /**
     * checked status of radio button
     */
    public ischecked(): boolean {
        return this.coreRadioButton?.checked;
    }

    /** @hidden method to select radio button */
    public select(): void {
        if (this.coreRadioButton) {
            this.coreRadioButton.currentValue = this.value;
            this._cd.detectChanges();
        }
    }

    /** @hidden method to uncheck radio button */
    public unselect(): void {
        if (this.coreRadioButton) {
            this.coreRadioButton.currentValue = undefined;
            this.coreRadioButton.tabIndex = -1;
            this._cd.detectChanges();
        }
    }
}
