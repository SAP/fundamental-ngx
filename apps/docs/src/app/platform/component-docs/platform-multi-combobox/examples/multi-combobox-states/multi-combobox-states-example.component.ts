import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { ComboboxSelectionChangeEvent } from '@fundamental-ngx/platform/form';

import { DATA_PROVIDERS } from '@fundamental-ngx/platform/shared';

@Component({
    selector: 'fdp-multi-combobox-states-example',
    templateUrl: './multi-combobox-states-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [{ provide: DATA_PROVIDERS, useValue: new Map() }],
    styles: [
        `
            fdp-form-group .fd-row__form-item > .fd-col:first-child {
                margin-bottom: 1rem;
            }
        `
    ]
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

    states = ['Default', 'Success', 'Error', 'Warning', 'Information'];
    selectedState = this.states[0];

    onSelectState(item: ComboboxSelectionChangeEvent): void {
        this.selectedState = item.payload;
    }
}
