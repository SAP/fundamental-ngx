import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckboxGroupComponent } from '@fundamental-ngx/platform/form';
import { PlatformTextAreaModule } from '@fundamental-ngx/platform/form';
import { FdpFormGroupModule } from '@fundamental-ngx/platform/form';
import { NgIf } from '@angular/common';

@Component({
    selector: 'fdp-platform-form-container-possible-example',
    templateUrl: './platform-form-container-possible-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        NgIf,
        FdpFormGroupModule,
        FormsModule,
        ReactiveFormsModule,
        PlatformTextAreaModule,
        CheckboxGroupComponent
    ]
})
export class PlatformFormContainerPossibleExampleComponent {
    form: FormGroup = new FormGroup({});
    form1: FormGroup = new FormGroup({});

    seasons: string[] = ['Winter', 'Spring', 'Summer', 'Autumn'];
}
