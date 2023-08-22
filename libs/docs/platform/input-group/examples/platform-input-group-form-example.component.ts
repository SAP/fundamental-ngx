import { Component, ChangeDetectionStrategy } from '@angular/core';
import { NgIf, JsonPipe } from '@angular/common';
import { PlatformButtonModule } from '@fundamental-ngx/platform/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PlatformInputGroupModule } from '@fundamental-ngx/platform/form';
import { FdpFormGroupModule } from '@fundamental-ngx/platform/form';

@Component({
    selector: 'fdp-input-group-form-example',
    templateUrl: './platform-input-group-form-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        FdpFormGroupModule,
        PlatformInputGroupModule,
        FormsModule,
        ReactiveFormsModule,
        PlatformButtonModule,
        NgIf,
        JsonPipe
    ]
})
export class PlatformInputGroupFormExampleComponent {}
