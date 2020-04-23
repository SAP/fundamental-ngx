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
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, Optional, Self, ViewChild, ElementRef, OnChanges, TemplateRef } from '@angular/core';
import { FormFieldControl } from '../form-control';
import { NgControl, NgForm } from '@angular/forms';
import { BaseInput } from '../base.input';
import { CssClassBuilder, applyCssClass } from '@fundamental-ngx/core';


const VALID_INPUT_TYPES = [
    'text',
    'number',
    'email',
    'password'
];

type InputType = 'text' | 'number' | 'email' | 'password';
type Status = 'error' | 'warning' | 'information' | 'success';

/**
 * Input field implementation to be compliant with our FormGroup/FormField design and also to
 * achieve certain this in Angular this component is re-using several ideas from MatDesign
 *
 */
@Component({
    selector: 'fdp-input',
    templateUrl: 'input.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['input.component.scss'],
    providers: [
        { provide: FormFieldControl, useExisting: InputComponent, multi: true }
    ]
})
export class InputComponent extends BaseInput implements CssClassBuilder {

    /** defines the input type of the input. */
    @Input()
    type: InputType = 'text';

    /** defines the state of the text box to identify the validation status. */
    @Input()
    state: Status;
 
    /** Whether the input is read-only. */
    @Input()
    readonly: boolean = false;

    /** Whether the input is disabled. */
    @Input()
    disabled: boolean = false;

    /** to define the compactness of the componenent. */
    @Input()
    compact: boolean = false;
    
    /**calass variable to add the class names.  */
    @Input()
    class: string = '';

    /** @hidden */
    @ViewChild('inputElement')
    inputElement: ElementRef;

    /** return the value in the text box */
    @Input()
    get value(): any {
        return super.getValue();
    }

    set value(value: any) {
        super.setValue(value);
    }


    /** This method is responsible for building a css class based on current state
     *  It is implementation of CssClassBuilder interface and
     *  should be used with @applyCssClass decorator
     */
    @applyCssClass
    buildComponentCssClass(): string {
        return [
            'fd-input',
            this.state  ? `is-${this.state}` : '',
            this.class
        ].filter(x => x !== '').join(' ');
    }

    /** @hidden */
    elementRef(): ElementRef<any> {
        return this.inputElement;
    }


    constructor(protected _cd: ChangeDetectorRef,
                @Optional() @Self() public ngControl: NgControl,
                @Optional() @Self() public ngForm: NgForm) {


        super(_cd, ngControl, ngForm);
    }

    ngOnInit(): void {
        this.buildComponentCssClass();
        if (!this.type || VALID_INPUT_TYPES.indexOf(this.type) === -1) {
            throw new Error(` Input type ${this.type} is not supported`);
        }
    }
}
