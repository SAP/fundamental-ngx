import { Component, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { FdpFormGroupModule, PlatformTextAreaModule } from '@fundamental-ngx/platform/form';

@Component({
    selector: 'fdp-platform-textarea-autogrow-example',
    templateUrl: './platform-textarea-autogrow-example.component.html',
    encapsulation: ViewEncapsulation.None,
    imports: [FdpFormGroupModule, FormsModule, ReactiveFormsModule, PlatformTextAreaModule]
})
export class PlatformTextareaAutogrowExampleComponent {
    form: FormGroup;
    textareaValidator: ValidatorFn[];
    tValue = '1\n2\n3\n4\n5\n6';

    constructor() {
        this.form = new FormGroup({});

        this.textareaValidator = [Validators.maxLength(6)];
    }
}
