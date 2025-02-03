import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckboxGroupComponent, FdpFormGroupModule, PlatformTextAreaModule } from '@fundamental-ngx/platform/form';

@Component({
    selector: 'fdp-platform-form-container-possible-example',
    templateUrl: './platform-form-container-possible-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [FdpFormGroupModule, FormsModule, ReactiveFormsModule, PlatformTextAreaModule, CheckboxGroupComponent]
})
export class PlatformFormContainerPossibleExampleComponent {
    form: FormGroup = new FormGroup({});
    form1: FormGroup = new FormGroup({});

    seasons: string[] = ['Winter', 'Spring', 'Summer', 'Autumn'];
}
