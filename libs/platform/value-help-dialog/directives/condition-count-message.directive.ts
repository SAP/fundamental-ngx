import { coerceNumberProperty } from '@angular/cdk/coercion';
import { Directive, Input } from '@angular/core';
import { AbstractControl, FormControl, NG_VALIDATORS, ValidationErrors, ValidatorFn } from '@angular/forms';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fdp-condition-count-message]',
    providers: [{ provide: NG_VALIDATORS, useExisting: ConditionCountMessageDirective, multi: true }],
    standalone: true
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

    /** @ignore */
    private _maxCharacters = Number.MAX_SAFE_INTEGER;

    /** @ignore */
    private readonly validator: ValidatorFn;

    /** @ignore */
    constructor() {
        this.validator = this.checkError();
    }

    /** @ignore */
    validate(control: FormControl): ValidationErrors | null {
        return this.validator(control);
    }

    /** @ignore */
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
