/**
 * @license
 * F. Kolar
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
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    Input,
    OnInit,
    ViewChild,
    ElementRef,
    ChangeDetectorRef,
    Optional,
    Self,
    SkipSelf,
    Host,
    Output,
    EventEmitter
} from '@angular/core';
import { NgForm, NgControl } from '@angular/forms';

import { FormFieldControl } from '../form-control';
import { BaseInput } from '../base.input';
import { FormField } from '../form-field';

const VALID_INPUT_TYPES = ['text', 'number', 'email', 'password'];

export type InputType = 'text' | 'number' | 'email' | 'password';

/**
 * Input field implementation to be compliant with our FormGroup/FormField design and also to
 * achieve certain this in Angular this component is re-using several ideas from MatDesign
 *
 */
@Component({
    selector: 'fdp-input',
    templateUrl: 'input.component.html',
    styleUrls: ['./input.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [{ provide: FormFieldControl, useExisting: InputComponent, multi: true }]
})
export class InputComponent extends BaseInput implements OnInit, AfterViewInit {
    @Input()
    type: InputType = 'text';

    /**
     * @hidden 
     * This `required` field is used internally by other components such as Input Group.
     * Input group will not be able to set required value to input, until `required` is input through the`@Input` property.
     */
    @Input()
    required: boolean;

    /** @hidden */
    @ViewChild('inputElemRef')
    inputElemRef: ElementRef;

    /** return the value in the text box */
    @Input()
    get value(): any {
        return super.getValue();
    }

    set value(value: any) {
        super.setValue(value);
    }

    /** Emits event on focus change */
    @Output() focusChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    /** @hidden */
    elementRef(): ElementRef<any> {
        return this.inputElemRef;
    }

    constructor(
        cd: ChangeDetectorRef,
        @Optional() @Self() ngControl: NgControl,
        @Optional() @SkipSelf() ngForm: NgForm,
        @Optional() @SkipSelf() @Host() formField: FormField,
        @Optional() @SkipSelf() @Host() formControl: FormFieldControl<any>
    ) {
        super(cd, ngControl, ngForm, formField, formControl);
    }

    ngOnInit(): void {
        super.ngOnInit();
        if (!this.type || VALID_INPUT_TYPES.indexOf(this.type) === -1) {
            throw new Error(` Input type ${this.type} is not supported`);
        }
    }

    /** @hidden */
    _onFocus(): void {
        this._onFocusChanged(true);
        // propagate event
        this.focusChange.emit(true);
    }

    /** @hidden */
    _onBlur(): void {
        this._onFocusChanged(false);
        // propagate event
        this.focusChange.emit(false);
    }
}
