import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FdpFormGroupModule, PlatformTextAreaModule } from '@fundamental-ngx/platform/form';

@Component({
    selector: 'fdp-platform-form-basic-example',
    templateUrl: './platform-form-basic-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    imports: [FdpFormGroupModule, PlatformTextAreaModule, FormsModule, ReactiveFormsModule]
})
export class PlatformFormBasicExampleComponent {}
