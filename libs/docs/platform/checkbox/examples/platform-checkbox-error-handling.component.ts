import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { LinkComponent } from '@fundamental-ngx/core/link';
import { ButtonComponent } from '@fundamental-ngx/platform/button';
import { CheckboxComponent, FdpFormGroupModule } from '@fundamental-ngx/platform/form';

@Component({
    selector: 'fdp-platform-checkbox-error-handling',
    templateUrl: 'platform-checkbox-error-handling.component.html',
    imports: [
        FdpFormGroupModule,
        FormsModule,
        ReactiveFormsModule,
        CheckboxComponent,
        LinkComponent,
        ButtonComponent,
        JsonPipe
    ]
})
export class PlatformChekboxStyleComponent {
    customForm = new FormGroup({
        presence: new FormControl(),
        agreement: new FormControl()
    });
    data = new SomeObject(true, true);
    validators = [Validators.requiredTrue];

    onSubmit(): void {
        alert('Status: ' + this.customForm.status);
    }
}

class SomeObject {
    constructor(
        public presence: boolean,
        public agreement: boolean
    ) {}
}
