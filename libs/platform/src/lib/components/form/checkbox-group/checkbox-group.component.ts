import {
    Component,
    ContentChildren,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    EventEmitter,
    Input,
    Optional,
    Output,
    QueryList,
    Self,
    ViewEncapsulation,
    ViewChildren
} from '@angular/core';
import { NgControl, NgForm } from '@angular/forms';
import { CollectionBaseInput } from '../collection-base.input';
import { CheckboxComponent } from '../checkbox/checkbox.component';
import { PlatformCheckboxChange } from '../checkbox/checkbox.component';
import { FormFieldControl } from '../form-control';

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
    providers: [{ provide: FormFieldControl, useExisting: CheckboxGroupComponent, multi: true }]
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
    isInline: boolean = false;

    /** Children checkboxes passed as content */
    @ContentChildren(CheckboxComponent)
    contentCheckboxes: QueryList<CheckboxComponent>;

    /** Children checkboxes created from passed list values. */
    @ViewChildren(CheckboxComponent)
    viewCheckboxes: QueryList<CheckboxComponent>;

    @Output()
    readonly valueChange: EventEmitter<PlatformCheckboxChange> = new EventEmitter<PlatformCheckboxChange>();

    constructor(
        private _changeDetector: ChangeDetectorRef,
        @Optional() @Self() public ngControl: NgControl,
        @Optional() @Self() public ngForm: NgForm
    ) {
        super(_changeDetector, ngControl, ngForm);
    }

    writeValue(value: any): void {
        if (value) {
            super.writeValue(value);
        }
        this._changeDetector.detectChanges();
    }

    /**
     * raises event when Checkbox group value changes.
     * @param event: contains checkbox and event in a PlatformCheckboxChange class object.
     */
    public groupValueChanges(event: PlatformCheckboxChange): void {
        this.onTouched();
        this.valueChange.emit(event);
    }
}
