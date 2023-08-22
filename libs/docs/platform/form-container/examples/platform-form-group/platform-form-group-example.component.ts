import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { ContentDensityDirective } from '@fundamental-ngx/core/content-density';
import { PlatformSwitchModule } from '@fundamental-ngx/platform/form';
import { PlatformTextAreaModule } from '@fundamental-ngx/platform/form';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PlatformInputModule } from '@fundamental-ngx/platform/form';
import { FdpFormGroupModule } from '@fundamental-ngx/platform/form';

@Component({
    selector: 'fdp-platform-form-group-example',
    templateUrl: './platform-form-group-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [
        FdpFormGroupModule,
        PlatformInputModule,
        FormsModule,
        ReactiveFormsModule,
        PlatformTextAreaModule,
        PlatformSwitchModule,
        ContentDensityDirective
    ]
})
export class PlatformFormGroupExampleComponent {}
