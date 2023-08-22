import { Component } from '@angular/core';
import { FormGroup, FormControl, NgForm, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageToastService } from '@fundamental-ngx/core/message-toast';
import { NgIf } from '@angular/common';
import { PlatformButtonModule } from '@fundamental-ngx/platform/button';
import { ContentDensityDirective } from '@fundamental-ngx/core/content-density';
import { PlatformRadioGroupModule } from '@fundamental-ngx/platform/form';
import { FdpFormGroupModule } from '@fundamental-ngx/platform/form';

@Component({
    selector: 'fdp-platform-radio-group-list-example',
    templateUrl: './platform-radio-group-list-example.component.html',
    standalone: true,
    imports: [
        FormsModule,
        FdpFormGroupModule,
        ReactiveFormsModule,
        PlatformRadioGroupModule,
        ContentDensityDirective,
        PlatformButtonModule,
        NgIf
    ]
})
export class PlatformRadioGroupListExampleComponent {
    seasons: string[] = ['Winter', 'Spring', 'Summer', 'Autumn'];

    favoriteOption = '';
    favoriteOption2 = 'Winter';

    form1 = new FormGroup({
        radiol1: new FormControl('Winter')
    });

    form2 = new FormGroup({
        radiol2: new FormControl('')
    });
    form2Data = { radiol2: 'Winter' };

    form3 = new FormGroup({
        month: new FormControl('Winter')
    });

    constructor(private readonly _messageToastService: MessageToastService) {}

    onSubmit(form: NgForm): void {
        if (this.form1.controls.radiol1.status === 'INVALID' && form.submitted) {
            this.form1.controls.radiol1.markAsTouched();
        }
    }

    onReset(): void {
        this.form1.reset();
        const content = 'Form was successfully reset.';
        this._messageToastService.open(content, {
            duration: 5000
        });
    }
}
