import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { PlatformRadioGroupModule } from '@fundamental-ngx/platform/form';
import { PlatformButtonModule } from '@fundamental-ngx/platform/button';
import { PlatformInputGroupModule } from '@fundamental-ngx/platform/form';
import { CheckboxGroupComponent } from '@fundamental-ngx/platform/form';
import { PlatformStepInputModule } from '@fundamental-ngx/platform/form';
import { PlatformInputModule } from '@fundamental-ngx/platform/form';
import { ContentDensityDirective } from '@fundamental-ngx/core/content-density';
import { PlatformSwitchModule } from '@fundamental-ngx/platform/form';
import { PlatformTextAreaModule } from '@fundamental-ngx/platform/form';
import { FdpFormGroupModule } from '@fundamental-ngx/platform/form';

@Component({
    selector: 'fdp-platform-form-container-complex-example',
    templateUrl: './platform-form-container-complex-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        FdpFormGroupModule,
        FormsModule,
        ReactiveFormsModule,
        PlatformTextAreaModule,
        PlatformSwitchModule,
        ContentDensityDirective,
        PlatformInputModule,
        PlatformStepInputModule,
        CheckboxGroupComponent,
        PlatformInputGroupModule,
        PlatformButtonModule,
        PlatformRadioGroupModule,
        NgIf
    ]
})
export class PlatformFormContainerComplexExampleComponent {
    form: FormGroup = new FormGroup({});
    seasons: string[] = ['Winter', 'Spring', 'Summer', 'Autumn'];
    qty = 10;
}
