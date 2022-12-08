import { AfterViewInit, Component, ViewChild } from '@angular/core';

import { DATA_PROVIDERS } from '@fundamental-ngx/platform/shared';
import { FormFieldComponent } from '@fundamental-ngx/platform/form';

@Component({
    selector: 'fdp-platform-multi-input-disabled',
    templateUrl: './platform-multi-input-disabled.component.html',
    providers: [{ provide: DATA_PROVIDERS, useValue: new Map() }]
})
export class PlatformMultiInputDisabledExampleComponent implements AfterViewInit {
    @ViewChild('ffl1') formFieldComponent: FormFieldComponent;

    ngAfterViewInit(): void {
        this.formFieldComponent.formControl.disable();
    }
}
