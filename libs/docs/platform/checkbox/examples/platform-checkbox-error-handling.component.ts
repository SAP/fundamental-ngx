import { FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { NgIf, JsonPipe } from '@angular/common';
import { PlatformButtonModule } from '@fundamental-ngx/platform/button';
import { LinkComponent } from '@fundamental-ngx/core/link';
import { CheckboxComponent } from '@fundamental-ngx/platform/form';
import { FdpFormGroupModule } from '@fundamental-ngx/platform/form';

@Component({
    selector: 'fdp-platform-checkbox-error-handling',
    templateUrl: 'platform-checkbox-error-handling.component.html',
    standalone: true,
    imports: [
        FdpFormGroupModule,
        FormsModule,
        ReactiveFormsModule,
        CheckboxComponent,
        LinkComponent,
        PlatformButtonModule,
        NgIf,
        JsonPipe
    ]
})
export class PlatformChekboxStyleComponent {
    customForm = new FormGroup({
        presence: new FormControl(),
        aggrement: new FormControl()
    });
    data = new SomeObject(true, true);
    validators = [Validators.requiredTrue];

    onSubmit(): void {
        alert('Status: ' + this.customForm.status);
    }
}

class SomeObject {
    constructor(public presence: boolean, public aggrement: boolean) {}
}
