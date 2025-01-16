import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckboxGroupComponent, FdpFormGroupModule, PlatformTextAreaModule } from '@fundamental-ngx/platform/form';

@Component({
    selector: 'fdp-platform-form-container-recommended-example',
    templateUrl: './platform-form-container-recommended-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [FdpFormGroupModule, FormsModule, ReactiveFormsModule, PlatformTextAreaModule, CheckboxGroupComponent]
})
export class PlatformFormContainerRecommendedExampleComponent {
    form: FormGroup = new FormGroup({});
    form1: FormGroup = new FormGroup({});
    form2: FormGroup = new FormGroup({});

    seasons: string[] = ['Winter', 'Spring', 'Summer', 'Autumn'];
}
