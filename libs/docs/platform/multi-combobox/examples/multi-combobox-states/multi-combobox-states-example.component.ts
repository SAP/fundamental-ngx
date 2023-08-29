import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { FormStates } from '@fundamental-ngx/cdk/forms';
import { ComboboxSelectionChangeEvent } from '@fundamental-ngx/platform/form';

import {
    FdpFormGroupModule,
    PlatformComboboxModule,
    PlatformMultiComboboxModule
} from '@fundamental-ngx/platform/form';
import { DATA_PROVIDERS } from '@fundamental-ngx/platform/shared';

@Component({
    selector: 'fdp-multi-combobox-states-example',
    templateUrl: './multi-combobox-states-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [{ provide: DATA_PROVIDERS, useValue: new Map() }],
    standalone: true,
    imports: [FdpFormGroupModule, PlatformComboboxModule, PlatformMultiComboboxModule]
})
export class MultiComboboxStatesExampleComponent {
    dataSource = [
        { name: 'Apple' },
        { name: 'Banana' },
        { name: 'Pineapple' },
        { name: 'Strawberry' },
        { name: 'Broccoli' },
        { name: 'Carrot' },
        { name: 'Jalapeño' },
        { name: 'Spinach' }
    ];

    states: FormStates[] = ['default', 'success', 'error', 'warning', 'information'];
    selectedState: FormStates = this.states[0];

    onSelectState(item: ComboboxSelectionChangeEvent): void {
        this.selectedState = item.payload;
    }
}
