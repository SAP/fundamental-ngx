import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContentDensityDirective } from '@fundamental-ngx/core/content-density';
import { ButtonComponent } from '@fundamental-ngx/platform/button';
import {
    CheckboxGroupComponent,
    FdpFormGroupModule,
    PlatformInputGroupModule,
    PlatformInputModule,
    PlatformRadioGroupModule,
    PlatformStepInputModule,
    PlatformSwitchModule,
    PlatformTextAreaModule
} from '@fundamental-ngx/platform/form';

@Component({
    selector: 'fdp-platform-form-container-complex-example',
    templateUrl: './platform-form-container-complex-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
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
        ButtonComponent,
        PlatformRadioGroupModule
    ]
})
export class PlatformFormContainerComplexExampleComponent {
    form: FormGroup = new FormGroup({});
    seasons: string[] = ['Winter', 'Spring', 'Summer', 'Autumn'];
    qty = 10;
}
