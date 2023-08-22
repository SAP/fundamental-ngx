import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { MultiComboboxSelectionChangeEvent } from '@fundamental-ngx/core/multi-combobox';
import { FormStates } from '@fundamental-ngx/cdk/forms';
import { MultiComboboxModule } from '@fundamental-ngx/core/multi-combobox';
import { DataSourceDirective } from '@fundamental-ngx/cdk/data-source';
import { CvaDirective } from '@fundamental-ngx/cdk/forms';
import { FormLabelModule } from '@fundamental-ngx/core/form';
import { FormItemModule } from '@fundamental-ngx/core/form';

@Component({
    selector: 'fd-multi-combobox-states-example',
    templateUrl: './multi-combobox-states-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [FormItemModule, FormLabelModule, CvaDirective, DataSourceDirective, MultiComboboxModule]
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

    onSelectState(item: MultiComboboxSelectionChangeEvent): void {
        this.selectedState = item.selectedItems;
    }
}
