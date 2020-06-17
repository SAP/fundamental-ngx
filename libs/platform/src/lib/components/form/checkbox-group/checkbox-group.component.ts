/**
 * @license
 * SAP
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 *
 */
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
    readonly groupValueChange: EventEmitter<PlatformCheckboxChange> = new EventEmitter<PlatformCheckboxChange>();

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
        if (this.ngControl.invalid && this.ngControl.touched) {
            if (this.viewCheckboxes && this.viewCheckboxes.length > 0) {
                this.viewCheckboxes.forEach((checkbox) => {
                    checkbox.ngControl?.control.setErrors(this.ngControl.errors);
                    checkbox._status = this.status;
                    checkbox.detectChanges();
                });
            }
            if (this.contentCheckboxes && this.contentCheckboxes.length > 0) {
                this.contentCheckboxes.forEach((checkbox) => {
                    checkbox.ngControl?.control.setErrors(this.ngControl.errors);
                    checkbox._status = this.status;
                    checkbox.detectChanges();
                });
            }
        }

        this.onTouched();
        this.groupValueChange.emit(event);
    }
}
