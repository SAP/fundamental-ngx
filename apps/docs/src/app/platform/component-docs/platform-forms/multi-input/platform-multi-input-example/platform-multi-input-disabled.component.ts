import { Component } from '@angular/core';
import { DATA_PROVIDERS } from '@fundamental-ngx/platform';

@Component({
    selector: 'fdp-platform-multi-input-disabled',
    templateUrl: './platform-multi-input-disabled.component.html',
    providers: [{ provide: DATA_PROVIDERS, useValue: new Map() }]
})
export class PlatformMultiInputDisabledExampleComponent {}
