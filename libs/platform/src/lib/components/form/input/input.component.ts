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
    ChangeDetectorRef,
    Component,
    Input,
    OnInit,
    Optional,
    Self,
    ViewChild,
    ElementRef
} from '@angular/core';
import { FormFieldControl, Status } from '../form-control';
import { NgControl, NgForm } from '@angular/forms';
import { BaseInput } from '../base.input';

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

    state: Status = 'default';

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

    /** @hidden */
    elementRef(): ElementRef<any> {
        return this.inputElemRef;
    }

    constructor(
        protected _cd: ChangeDetectorRef,
        @Optional() @Self() public ngControl: NgControl,
        @Optional() @Self() public ngForm: NgForm
    ) {
        super(_cd, ngControl, ngForm);
    }

    ngOnInit(): void {
        super.ngOnInit();
        if (!this.type || VALID_INPUT_TYPES.indexOf(this.type) === -1) {
            throw new Error(` Input type ${this.type} is not supported`);
        }
    }
}
