import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CheckboxGroupComponent, FdpFormGroupModule, PlatformTextAreaModule } from '@fundamental-ngx/platform/form';
import { RESPONSIVE_BREAKPOINTS_CONFIG } from '@fundamental-ngx/platform/shared';

const DEFAULT_NEW_BREAKPOINTS_CONFIG = {
    S: 800,
    M: 1224,
    L: 1540
};

@Component({
    selector: 'fdp-platform-form-column-change-example',
    templateUrl: './platform-field-column-change-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [
        {
            provide: RESPONSIVE_BREAKPOINTS_CONFIG,
            useValue: DEFAULT_NEW_BREAKPOINTS_CONFIG
        }
    ],
    imports: [FdpFormGroupModule, FormsModule, ReactiveFormsModule, PlatformTextAreaModule, CheckboxGroupComponent]
})
export class PlatformFieldColumnChangeExampleComponent {
    form: FormGroup = new FormGroup({});

    seasons: string[] = ['Winter', 'Spring', 'Summer', 'Autumn'];
}
