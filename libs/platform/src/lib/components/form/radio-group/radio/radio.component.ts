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

import { RadioButtonComponent as CoreRadioButtonComponent, stateType } from '@fundamental-ngx/core';

import { BaseInput } from '../../base.input';
import { Status, FormFieldControl } from '../../form-control';
import { FormField } from '../../form-group/form-field/form-field';

let uniqueId = 0;

@Component({
    selector: 'fdp-radio-button',
    templateUrl: './radio.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RadioButtonComponent extends BaseInput {
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
        if (newStatus !== 'error' && newStatus !== 'warning') {
            this.state = 'default';
        }
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
        @Optional() @Self() ngForm: NgForm,
        @Optional() @Self() ngControl: NgControl,
        @Optional() @SkipSelf() @Host() formField: FormField,
        @Optional() @SkipSelf() @Host() formControl: FormFieldControl<any>
    ) {
        super(cd, ngForm, ngControl, formField, formControl);

        if (this.ngControl) {
            this.ngControl.valueAccessor = this;
        }
        // @hidden have to set default initial values as base class has check and throws error
        this.id = `radio-id-${uniqueId++}`;
        this.name = `radio-id-${uniqueId++}`;
    }

    /** @hidden change formcontrol value, emits the event*/
    onClick(event: KeyboardEvent | MouseEvent): void {
        event.stopPropagation();
        if (!this.disabled) {
            if (super.getValue() !== undefined) {
                this.onChange(super.getValue());
                this.click.emit(this);
            }
        }
    }

    /**
     * checked status of radio button
     */
    ischecked(): boolean {
        if (this.coreRadioButton && this.coreRadioButton.elementRef()) {
            return this.coreRadioButton.elementRef().nativeElement.checked;
        }
        return false;
    }

    /** @hidden method to select radio button */
    select(): void {
        if (this.coreRadioButton && this.coreRadioButton.inputElement) {
            this.coreRadioButton.elementRef().nativeElement.checked = true;
            this._cd.detectChanges();
        }
    }

    /** @hidden method to uncheck radio button */
    unselect(): void {
        if (this.coreRadioButton && this.coreRadioButton.inputElement) {
            this.coreRadioButton.elementRef().nativeElement.checked = false;
            this._cd.detectChanges();
        }
    }
}
