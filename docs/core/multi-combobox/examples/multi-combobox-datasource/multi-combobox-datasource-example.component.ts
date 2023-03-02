import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ArrayMultiComboBoxDataSource, MultiComboboxSelectionChangeEvent } from '@fundamental-ngx/core/multi-combobox';
import { of } from 'rxjs';

@Component({
    selector: 'fd-multi-combobox-datasource-example',
    templateUrl: './multi-combobox-datasource-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MultiComboboxDatasourceExampleComponent {
    isLimitless = true;

    dataSourceStrings = ['Apple', 'Banana', 'Pineapple', 'Strawberry', 'Broccoli', 'Carrot', 'Jalapeño', 'Spinach'];

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

    dataSourceOf = of(this.dataSource);
    ds = new ArrayMultiComboBoxDataSource(this.dataSource);
    dsl = new ArrayMultiComboBoxDataSource(this.dataSource);

    selectedItems1 = [this.dataSourceStrings[1]];
    selectedItems2 = [this.dataSource[1]];
    selectedItems3 = [];
    selectedItems4 = [];
    selectedItems5 = [
        this.dataSourceStrings[1],
        this.dataSourceStrings[2],
        this.dataSourceStrings[3],
        this.dataSourceStrings[4]
    ];
    selectedItems6 = [];

    onSelect1(item: MultiComboboxSelectionChangeEvent): void {
        this.selectedItems1 = item.selectedItems;
    }

    onSelect2(item: MultiComboboxSelectionChangeEvent): void {
        this.selectedItems2 = item.selectedItems;
    }

    onSelect3(item: MultiComboboxSelectionChangeEvent): void {
        this.selectedItems3 = item.selectedItems;
    }

    onSelect4(item: MultiComboboxSelectionChangeEvent): void {
        this.selectedItems4 = item.selectedItems;
    }

    onSelect5(item: MultiComboboxSelectionChangeEvent): void {
        this.selectedItems5 = item.selectedItems;
    }

    onSelect6(item: MultiComboboxSelectionChangeEvent): void {
        this.selectedItems6 = item.selectedItems;
    }
}
