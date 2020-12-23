import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ComboboxSelectionChangeEvent } from '@fundamental-ngx/platform';

@Component({
    selector: 'fdp-combobox-states-example',
    templateUrl: './combobox-states-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComboboxStateComponent {
    dataSource = [
        'Apple',
        'Banana',
        'Pineapple',
        'Strawberry',
        'Broccoli',
        'Carrot',
        'Jalapeño',
        'Spinach'
    ];

    states = ['success', 'error', 'warning', 'information'];
    selectedState: string = null;

    onSelectState(item: ComboboxSelectionChangeEvent): void {
        this.selectedState = item.payload;
    }
}
