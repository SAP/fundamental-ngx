import { Component, ViewEncapsulation } from '@angular/core';
import { ValidatorFn, Validators, FormGroup } from '@angular/forms';

@Component({
    selector: 'fdp-platform-textarea-i18n-example',
    templateUrl: './platform-textarea-i18n-example.component.html',
    encapsulation: ViewEncapsulation.None
})
export class PlatformTextareaI18nExampleComponent {
    form: FormGroup;
    private textareaValidator: ValidatorFn[];
    // textareaValue = $localize`:@@textareaValue:This is long description just to see
    // if this gets translated to the right language. This is long description just to see if this gets translated
    // to the right language. This is long description just to see if this gets translated to the right language.
    // This is long description just to see if this gets translated to the right language. This is long description just to see
    // if this gets translated to the right language. `;

    constructor() {
        this.form = new FormGroup({});

        this.textareaValidator = [Validators.maxLength(10), Validators.required];
    }
}
