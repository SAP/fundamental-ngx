import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BaseDataProvider, MultiComboBoxDataSource } from '@fundamental-ngx/platform/shared';

import { MultiComboboxSelectionChangeEvent } from '@fundamental-ngx/platform/form';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

const OPTIONS = [
    { name: 'Apple', type: 'Fruits' },
    { name: 'Banana', type: 'Fruits' },
    { name: 'Pineapple', type: 'Fruits' },
    { name: 'Strawberry', type: 'Fruits' },
    { name: 'Broccoli', type: 'Vegetables' },
    { name: 'Carrot', type: 'Vegetables' },
    { name: 'Jalapeño', type: 'Vegetables' },
    { name: 'Spinach', type: 'Vegetables' }
];

@Component({
    selector: 'fdp-multi-combobox-loading-example',
    templateUrl: './multi-combobox-loading-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MultiComboboxLoadingExampleComponent {
    dataSource = new MultiComboBoxDataSource(new DelayedBaseDataProvider(OPTIONS));

    selectedItems = [];
    loading = false;

    onSelect(item: MultiComboboxSelectionChangeEvent): void {
        this.selectedItems = item.selectedItems;
    }

    onDataRequested(): void {
        this.loading = true;
    }
    onDataReceived(): void {
        this.loading = false;
    }
}

// Simulating real http request by adding 300ms delay to the DataProvider's "fetch" method
class DelayedBaseDataProvider<T> extends BaseDataProvider<T> {
    fetch(params: Map<string, any>): Observable<T[]> {
        return super.fetch(params).pipe(delay(300));
    }
}
