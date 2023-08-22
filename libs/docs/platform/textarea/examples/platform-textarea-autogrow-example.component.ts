import { Component, ViewEncapsulation } from '@angular/core';
import { ValidatorFn, Validators, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PlatformTextAreaModule } from '@fundamental-ngx/platform/form';
import { FdpFormGroupModule } from '@fundamental-ngx/platform/form';
import { NgIf } from '@angular/common';

@Component({
    selector: 'fdp-platform-textarea-autogrow-example',
    templateUrl: './platform-textarea-autogrow-example.component.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [NgIf, FdpFormGroupModule, FormsModule, ReactiveFormsModule, PlatformTextAreaModule]
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
