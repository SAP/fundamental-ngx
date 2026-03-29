import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DataSourceDirective } from '@fundamental-ngx/cdk/data-source';
import { CvaDirective } from '@fundamental-ngx/cdk/forms';
import { FocusableItemDirective } from '@fundamental-ngx/cdk/utils';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { FormItemComponent, FormLabelComponent } from '@fundamental-ngx/core/form';
import { MultiComboboxComponent, MultiComboboxSelectionChangeEvent } from '@fundamental-ngx/core/multi-combobox';
import { SegmentedButtonComponent } from '@fundamental-ngx/core/segmented-button';

interface ExampleItem {
    name: string;
    type: string;
}

const DATASETS: Record<string, ExampleItem[]> = {
    fruits: [
        { name: 'Apple', type: 'Fruits' },
        { name: 'Banana', type: 'Fruits' },
        { name: 'Pineapple', type: 'Fruits' },
        { name: 'Strawberry', type: 'Fruits' },
        { name: 'Grapes', type: 'Fruits' },
        { name: 'Orange', type: 'Fruits' }
    ],
    vegetables: [
        { name: 'Broccoli', type: 'Vegetables' },
        { name: 'Carrot', type: 'Vegetables' },
        { name: 'Jalapeño', type: 'Vegetables' },
        { name: 'Spinach', type: 'Vegetables' },
        { name: 'Potato', type: 'Vegetables' },
        { name: 'Tomato', type: 'Vegetables' }
    ]
};

@Component({
    selector: 'fd-multi-combobox-dynamic-datasource-example',
    templateUrl: './multi-combobox-dynamic-datasource-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        FormItemComponent,
        FormLabelComponent,
        FormsModule,
        CvaDirective,
        DataSourceDirective,
        MultiComboboxComponent,
        SegmentedButtonComponent,
        ButtonComponent,
        FocusableItemDirective,
        JsonPipe
    ]
})
export class MultiComboboxDynamicDatasourceExampleComponent {
    dataSource = signal<ExampleItem[]>([]);
    selectedItems: ExampleItem[] = [];
    activeDataset = signal('');

    constructor() {
        // Simulate async data load (e.g. HTTP request)
        setTimeout(() => {
            this.dataSource.set(DATASETS['fruits']);
            this.activeDataset.set('fruits');
        }, 500);
    }

    switchDataset(key: string): void {
        this.dataSource.set(DATASETS[key]);
        this.activeDataset.set(key);
        this.selectedItems = [];
    }

    onSelect(event: MultiComboboxSelectionChangeEvent): void {
        this.selectedItems = event.selectedItems;
    }
}
