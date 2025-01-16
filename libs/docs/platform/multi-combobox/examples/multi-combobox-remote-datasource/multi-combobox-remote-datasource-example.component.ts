import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import {
    FormFieldComponent,
    FormGroupComponent,
    MultiComboboxComponent,
    MultiComboboxSelectionChangeEvent
} from '@fundamental-ngx/platform/form';
import { BaseDataProvider, MultiComboBoxDataSource } from '@fundamental-ngx/platform/shared';
import { Observable, map, of } from 'rxjs';

@Component({
    selector: 'fdp-multi-combobox-remote-datasource-example',
    template: `
        <fdp-form-group [noLabelLayout]="false">
            <fdp-form-field>
                <fdp-multi-combobox
                    [autoResize]="true"
                    name="array-of-objects"
                    placeholder="Type some text..."
                    [dataSource]="DataSource1"
                    displayKey="name"
                    lookupKey="id"
                    [selectedItems]="selectedItems2"
                    (selectionChange)="onSelect2($event)"
                ></fdp-multi-combobox>
            </fdp-form-field>
        </fdp-form-group>
        <p>Selected: {{ selectedItems2 | json }}</p>
    `,
    imports: [FormGroupComponent, FormFieldComponent, MultiComboboxComponent, JsonPipe]
})
export class MultiComboboxRemoteDatasourceExampleComponent {
    dataSource = [
        { id: '1', name: 'Apple', type: 'Fruits' },
        { id: '2', name: 'Pineapple', type: 'Fruits' },
        { id: '3', name: 'Strawberry', type: 'Fruits' },
        { id: '4', name: 'Broccoli', type: 'Vegetables' },
        { id: '5', name: 'Carrot', type: 'Vegetables' },
        { id: '6', name: 'Jalapeño', type: 'Vegetables' },
        { id: '7', name: 'Spinach', type: 'Vegetables' },
        { id: '8', name: 'Ukraine', type: 'Countries' },
        { id: '9', name: 'Georgia', type: 'Countries' },
        { id: '10', name: 'Poland', type: 'Countries' },
        { id: '11', name: 'Finland', type: 'Countries' },
        { id: '12', name: 'Denmark', type: 'Countries' },
        { id: '13', name: 'Sweden', type: 'Countries' },
        { id: '14', name: 'Lietuva', type: 'Countries' },
        { id: '15', name: 'Latvia', type: 'Countries' },
        { id: '16', name: 'Spain', type: 'Countries' },
        { id: '17', name: 'Switzerland', type: 'Countries' },
        { id: '18', name: 'USA', type: 'Countries' },
        { id: '19', name: 'Turkey', type: 'Countries' },
        { id: '20', name: 'Italy', type: 'Countries' },
        { id: '21', name: 'Azerbaijan', type: 'Countries' },
        { id: '22', name: 'Germany', type: 'Countries' },
        { id: '23', name: 'Audi', type: 'Cars' },
        { id: '24', name: 'Mercedes', type: 'Cars' },
        { id: '25', name: 'Tesla', type: 'Cars' },
        { id: '26', name: 'Porsche', type: 'Cars' },
        { id: '27', name: 'Toyota', type: 'Cars' },
        { id: '28', name: 'Ford', type: 'Cars' }
    ];

    selectedItems2 = [];

    DataSource1 = new MultiComboBoxDataSource(new BaseDataProviderCustom(this.dataSource));

    onSelect2(item: MultiComboboxSelectionChangeEvent): void {
        this.selectedItems2 = item.selectedItems;
    }
}

class BaseDataProviderCustom extends BaseDataProvider<any> {
    private valueSet;

    constructor(protected override values: any[]) {
        super(values.slice(0, 10));
        this.valueSet = values;
    }

    // Below fetch is just an exmaple to reproduce the issue
    // but ideally the fetch method will make a API call to the
    // backend server for data filtering.
    override fetch(params: Map<string, any>): Observable<any[]> {
        const observable = of(this.valueSet);

        const queryString = params.get('query');
        const limit = 10;

        if (!queryString || queryString === '*') {
            return observable.pipe(map((items) => this.dataLimit(items, limit)));
        }

        const toLowerPattern = queryString.toLowerCase();

        return observable.pipe(
            map((items) => {
                const result: any[] = [];
                for (let i = 0; i < items.length; i++) {
                    const item = items[i];
                    if (
                        item.id.toLowerCase().includes(toLowerPattern) ||
                        item.name.toLowerCase().includes(toLowerPattern)
                    ) {
                        result.push(item);
                        if (result.length >= limit) {
                            break;
                        }
                    }
                }
                return result;
            })
        );
    }

    private dataLimit(data: any[], limit?: number): any[] {
        if (limit && data.length > limit) {
            return data.slice(0, limit);
        }
        return data;
    }
}
