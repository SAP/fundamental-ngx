import { ChangeDetectionStrategy, Component } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FdpFormGroupModule, PlatformMultiInputModule } from '@fundamental-ngx/platform/form';
import { DATA_PROVIDERS } from '@fundamental-ngx/platform/shared';

@Component({
    selector: 'fdp-platform-multi-input-grouped-example',
    templateUrl: './platform-multi-input-grouped-example.component.html',
    providers: [{ provide: DATA_PROVIDERS, useValue: new Map() }],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [FormsModule, FdpFormGroupModule, PlatformMultiInputModule, ReactiveFormsModule]
})
export class PlatformMultiInputGroupedExampleComponent {
    list_elements = [
        { name: 'Apple', type: 'Fruits' },
        { name: 'Banana', type: 'Fruits' },
        { name: 'Pineapple', type: 'Fruits' },
        { name: 'Strawberry', type: 'Fruits' },
        { name: 'Broccoli', type: 'Vegetables' },
        { name: 'Carrot', type: 'Vegetables' },
        { name: 'Jalapeño', type: 'Vegetables' },
        { name: 'Spinach', type: 'Vegetables' }
    ];
}
