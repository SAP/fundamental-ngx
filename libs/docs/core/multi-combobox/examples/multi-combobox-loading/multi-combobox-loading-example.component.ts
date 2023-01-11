import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DataProvider } from '@fundamental-ngx/cdk/data-source';
import { FdMultiComboBoxDataSource, MultiComboboxSelectionChangeEvent } from '@fundamental-ngx/core/multi-combobox';
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
    selector: 'fd-multi-combobox-loading-example',
    templateUrl: './multi-combobox-loading-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MultiComboboxLoadingExampleComponent {
    dataSource = new FdMultiComboBoxDataSource(new DelayedDataProvider(OPTIONS));

    selectedItems = [];
    loading = false;

    onSelect(item: MultiComboboxSelectionChangeEvent): void {
        this.selectedItems = item.selectedItems;
    }

    dataRequested(): void {
        this.loading = true;
    }
    dataReceived(): void {
        this.loading = false;
    }
}

// Simulating real http request by adding 300ms delay to the DataProvider's "fetch" method
class DelayedDataProvider<T> extends DataProvider<T> {
    fetch(params: Map<string, any>): Observable<T[]> {
        return super.fetch(params).pipe(delay(300));
    }
}
