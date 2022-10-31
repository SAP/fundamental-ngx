import { Directive, Input } from '@angular/core';
import { coerceNumberProperty } from '@angular/cdk/coercion';
import { AbstractControl, FormControl, NG_VALIDATORS, ValidationErrors, ValidatorFn } from '@angular/forms';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fdp-condition-count-message]',
    providers: [{ provide: NG_VALIDATORS, useExisting: ConditionCountMessageDirective, multi: true }]
})
export class ConditionCountMessageDirective {
    /** Max characters allowed */
    @Input()
    set maxCharacters(value: number) {
        this._maxCharacters = <number>coerceNumberProperty(value);
    }
    get maxCharacters(): number {
        return this._maxCharacters;
    }

    /** @hidden */
    private _maxCharacters = Number.MAX_SAFE_INTEGER;

    /** @hidden */
    private readonly validator: ValidatorFn;

    /** @hidden */
    constructor() {
        this.validator = this.checkError();
    }

    /** @hidden */
    validate(control: FormControl): ValidationErrors | null {
        return this.validator(control);
    }

    /** @hidden */
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
