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
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, Optional, Self } from '@angular/core';
import { FormFieldControl } from '../form-control';
import { NgControl, NgForm } from '@angular/forms';
import { BaseInput } from '../base.input';


const VALID_INPUT_TYPES = [
    'text',
    'number',
    'email'
];

export type InputType = 'text' | 'number' | 'email';

/**
 * Input field implementation to be compliant with our FormGroup/FormField design and also to
 * achieve certain this in Angular this component is re-using several ideas from MatDesign
 *
 */
@Component({
    selector: 'fdp-input',
    templateUrl: 'input.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        { provide: FormFieldControl, useExisting: InputComponent, multi: true }
    ]
})
export class InputComponent extends BaseInput {

    @Input()
    type: InputType = 'text';

    @Input()
    get value(): any {
        return super.getValue();
    }

    set value(value: any) {
        super.setValue(value);
    }

    constructor(protected _cd: ChangeDetectorRef,
                @Optional() @Self() public ngControl: NgControl,
                @Optional() @Self() public ngForm: NgForm) {


        super(_cd, ngControl, ngForm);

    }

    ngOnInit(): void {
        if (!this.type || VALID_INPUT_TYPES.indexOf(this.type) === -1) {
            throw new Error(` Input type ${this.type} is not supported`);
        }
    }


    ngAfterViewInit(): void {
        super.ngAfterViewInit();
    }


}

