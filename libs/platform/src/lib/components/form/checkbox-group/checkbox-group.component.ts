import {
    Component,
    ContentChildren,
    ChangeDetectionStrategy,
    EventEmitter,
    Input,
    Output,
    QueryList,
    ViewEncapsulation,
    ViewChildren,
    forwardRef,
    ChangeDetectorRef,
    Optional,
    Self,
    SkipSelf,
    Host
} from '@angular/core';
import { NgForm, NgControl } from '@angular/forms';

import { CollectionBaseInput } from '../collection-base.input';
import { CheckboxComponent } from '../checkbox/checkbox.component';
import { PlatformCheckboxChange } from '../checkbox/checkbox.component';
import { FormFieldControl } from '../form-control';
import { FormField } from '../form-group/form-field/form-field';

/**
 * Checkbox group implementation based on the
 * https://github.com/SAP/fundamental-ngx/wiki/Platform:-CheckboxGroup-Technical-Design
 * documents.
 *
 */

@Component({
    selector: 'fdp-checkbox-group',
    templateUrl: './checkbox-group.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [{ provide: FormFieldControl, useExisting: forwardRef(() => CheckboxGroupComponent), multi: true }]
})
export class CheckboxGroupComponent extends CollectionBaseInput {
    /**
     * value for selected checkboxes.
     */
    get value(): any {
        return super.getValue();
    }
    set value(selectedValue: any) {
        super.setValue(selectedValue);
    }

    /**
     * To Dispaly multiple checkboxes in a line
     */
    @Input()
    isInline = false;

    /** Children checkboxes passed as content */
    @ContentChildren(CheckboxComponent)
    contentCheckboxes: QueryList<CheckboxComponent>;

    /** Children checkboxes created from passed list values. */
    @ViewChildren(CheckboxComponent)
    viewCheckboxes: QueryList<CheckboxComponent>;

    @Output()
    readonly valueChange: EventEmitter<PlatformCheckboxChange> = new EventEmitter<PlatformCheckboxChange>();

    constructor(
        cd: ChangeDetectorRef,
        @Optional() @Self() ngForm: NgForm,
        @Optional() @Self() ngControl: NgControl,
        @Optional() @SkipSelf() @Host() formField: FormField,
        @Optional() @SkipSelf() @Host() formControl: FormFieldControl<any>
    ) {
        super(cd, ngForm, ngControl, formField, formControl);
    }

    writeValue(value: any): void {
        if (value) {
            super.writeValue(value);
            this.stateChanges.next('CBG: writevalue');
        }
    }

    /**
     * raises event when Checkbox group value changes.
     * @param event: contains checkbox and event in a PlatformCheckboxChange class object.
     */
    public groupValueChanges(event: PlatformCheckboxChange): void {
        this.onTouched();
        this.valueChange.emit(event);
    }

    /**
     * acess display value for objects, acts as checkbox label.
     */
    public getDisplayValue(item: any): string {
        return this.displayValue(item);
    }

    /**
     * acess lookup value for objects, acts as checkbox value.
     */
    public getLookupValue(item: any): string {
        return this.lookupValue(item);
    }
}
