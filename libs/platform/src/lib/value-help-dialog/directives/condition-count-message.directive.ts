import { Directive, Input } from '@angular/core';
import { coerceNumberProperty } from '@angular/cdk/coercion';
import { AbstractControl, FormControl, NG_VALIDATORS, ValidationErrors, ValidatorFn } from '@angular/forms';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fdp-condition-count-message]',
    providers: [{ provide: NG_VALIDATORS, useExisting: ConditionCountMessageDirective, multi: true }]
})
export class ConditionCountMessageDirective {
    @Input()
    get maxCharacters(): number {
        return this._maxCharacters;
    }
    set maxCharacters(value: number) {
        this._maxCharacters = <number>coerceNumberProperty(value);
    }

    private _maxCharacters = Number.MAX_SAFE_INTEGER;
    private readonly validator: ValidatorFn;

    constructor() {
        this.validator = this.checkError();
    }

    validate(control: FormControl): ValidationErrors | null {
        return this.validator(control);
    }

    private checkError(): ValidatorFn {
        return (control: AbstractControl) => {
            if (control.dirty && control.value && control.value.length > this.maxCharacters) {
                return {
                    maxCharacters: {
                        actualLength: control.value.length,
                        requiredLength: this.maxCharacters
                    }
                };
            }
            return null;
        };
    }
}
