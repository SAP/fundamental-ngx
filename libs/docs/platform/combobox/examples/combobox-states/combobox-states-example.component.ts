import { ChangeDetectionStrategy, Component } from '@angular/core';

import { DATA_PROVIDERS } from '@fundamental-ngx/platform/shared';
import { ComboboxSelectionChangeEvent } from '@fundamental-ngx/platform/form';
import { FormStates } from '@fundamental-ngx/cdk/forms';
import { PlatformComboboxModule } from '@fundamental-ngx/platform/form';
import { ContentDensityDirective } from '@fundamental-ngx/core/content-density';
import { FdpFormGroupModule } from '@fundamental-ngx/platform/form';

@Component({
    selector: 'fdp-combobox-states-example',
    templateUrl: './combobox-states-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [{ provide: DATA_PROVIDERS, useValue: new Map() }],
    standalone: true,
    imports: [FdpFormGroupModule, ContentDensityDirective, PlatformComboboxModule]
})
export class ComboboxStateComponent {
    dataSource = ['Apple', 'Banana', 'Pineapple', 'Strawberry', 'Broccoli', 'Carrot', 'Jalapeño', 'Spinach'];

    states: FormStates[] = ['default', 'success', 'error', 'warning', 'information'];
    selectedState = this.states[0];

    onSelectState(item: ComboboxSelectionChangeEvent): void {
        this.selectedState = item.payload;
    }
}
