import { ChangeDetectionStrategy, Component } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { FdpFormGroupModule, PlatformMultiInputModule } from '@fundamental-ngx/platform/form';
import { DATA_PROVIDERS } from '@fundamental-ngx/platform/shared';

@Component({
    selector: 'fdp-platform-multi-input-readonly-example',
    templateUrl: './platform-multi-input-readonly-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [{ provide: DATA_PROVIDERS, useValue: new Map() }],
    imports: [FdpFormGroupModule, PlatformMultiInputModule, FormsModule]
})
export class PlatformMultiInputReadonlyExampleComponent {
    _datasource = [
        { state: 'Alabama', city: 'Montgomery' },
        { state: 'Alaska', city: 'Juneau' },
        { state: 'Arizona', city: 'Phoenix' },
        { state: 'Arkansas', city: 'Little Rock' },
        { state: 'California', city: 'Sacramento' },
        { state: 'Colorado', city: 'Denver' },
        { state: 'Connecticut', city: 'Hartford' },
        { state: 'Delaware', city: 'Dover' },
        { state: 'Florida', city: 'Tallahassee' },
        { state: 'Georgia', city: 'Atlanta' },
        { state: 'Hawaii', city: 'Honolulu' },
        { state: 'Idaho', city: 'Boise' },
        { state: 'Illinois', city: 'Springfield' },
        { state: 'Indiana', city: 'Indianapolis' }
    ];

    selected = [
        { state: 'Alabama', city: 'Montgomery' },
        { state: 'Alaska', city: 'Juneau' },
        { state: 'Arizona', city: 'Phoenix' },
        { state: 'Arkansas', city: 'Little Rock' },
        { state: 'California', city: 'Sacramento' },
        { state: 'Colorado', city: 'Denver' },
        { state: 'Connecticut', city: 'Hartford' },
        { state: 'Delaware', city: 'Dover' },
        { state: 'Florida', city: 'Tallahassee' },
        { state: 'Georgia', city: 'Atlanta' }
    ];
}
