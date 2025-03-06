import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContentDensityDirective } from '@fundamental-ngx/core/content-density';
import {
    FdpFormGroupModule,
    PlatformInputModule,
    PlatformSwitchModule,
    PlatformTextAreaModule
} from '@fundamental-ngx/platform/form';

@Component({
    selector: 'fdp-platform-form-group-example',
    templateUrl: './platform-form-group-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
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
