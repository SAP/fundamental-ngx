import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { DataSourceDirective, MatchingStrategy } from '@fundamental-ngx/cdk/data-source';
import { CvaDirective } from '@fundamental-ngx/cdk/forms';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { FormItemComponent, FormLabelComponent } from '@fundamental-ngx/core/form';
import {
    ArrayMultiComboBoxDataSource,
    MultiComboboxComponent,
    MultiComboboxSelectionChangeEvent
} from '@fundamental-ngx/core/multi-combobox';
import { of } from 'rxjs';

@Component({
    selector: 'fd-multi-combobox-datasource-example',
    templateUrl: './multi-combobox-datasource-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        FormItemComponent,
        FormLabelComponent,
        CvaDirective,
        DataSourceDirective,
        MultiComboboxComponent,
        ButtonComponent,
        JsonPipe,
        ReactiveFormsModule
    ]
})
export class MultiComboboxDatasourceExampleComponent implements OnInit {
    isLimitless = true;
    matchingStategy = MatchingStrategy.CONTAINS;

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
        { id: '28', name: 'Ford', type: 'Cars' },
        { id: '29', name: 'Grapes', type: 'Fruits' },
        { id: '30', name: 'Watermelon', type: 'Fruits' },
        { id: '31', name: 'Orange', type: 'Fruits' },
        { id: '32', name: 'Cucumber', type: 'Vegetables' },
        { id: '33', name: 'Lettuce', type: 'Vegetables' },
        { id: '34', name: 'Potato', type: 'Vegetables' },
        { id: '35', name: 'Tomato', type: 'Vegetables' },
        { id: '36', name: 'China', type: 'Countries' },
        { id: '37', name: 'Japan', type: 'Countries' },
        { id: '38', name: 'Brazil', type: 'Countries' },
        { id: '39', name: 'Russia', type: 'Countries' },
        { id: '40', name: 'India', type: 'Countries' },
        { id: '41', name: 'Mexico', type: 'Countries' },
        { id: '42', name: 'Egypt', type: 'Countries' },
        { id: '43', name: 'Australia', type: 'Countries' },
        { id: '44', name: 'Netherlands', type: 'Countries' },
        { id: '45', name: 'Belgium', type: 'Countries' },
        { id: '46', name: 'UK', type: 'Countries' },
        { id: '47', name: 'France', type: 'Countries' },
        { id: '48', name: 'South Korea', type: 'Countries' },
        { id: '49', name: 'Malaysia', type: 'Countries' },
        { id: '50', name: 'Singapore', type: 'Countries' },
        { id: '51', name: 'Honda', type: 'Cars' },
        { id: '52', name: 'BMW', type: 'Cars' },
        { id: '53', name: 'Lamborghini', type: 'Cars' },
        { id: '54', name: 'Ferrari', type: 'Cars' },
        { id: '55', name: 'Chevrolet', type: 'Cars' },
        { id: '56', name: 'Mazda', type: 'Cars' },
        { id: '57', name: 'Cherry', type: 'Fruits' },
        { id: '58', name: 'Mango', type: 'Fruits' },
        { id: '59', name: 'Pear', type: 'Fruits' },
        { id: '60', name: 'Avocado', type: 'Fruits' },
        { id: '61', name: 'Cabbage', type: 'Vegetables' },
        { id: '62', name: 'Onion', type: 'Vegetables' },
        { id: '63', name: 'Garlic', type: 'Vegetables' },
        { id: '64', name: 'Pepper', type: 'Vegetables' },
        { id: '65', name: 'Germany', type: 'Countries' },
        { id: '66', name: 'France', type: 'Countries' },
        { id: '67', name: 'Spain', type: 'Countries' },
        { id: '68', name: 'Italy', type: 'Countries' },
        { id: '69', name: 'UK', type: 'Countries' },
        { id: '70', name: 'USA', type: 'Countries' },
        { id: '71', name: 'China', type: 'Countries' },
        { id: '72', name: 'Japan', type: 'Countries' },
        { id: '73', name: 'Brazil', type: 'Countries' },
        { id: '74', name: 'Russia', type: 'Countries' },
        { id: '75', name: 'India', type: 'Countries' },
        { id: '76', name: 'Mexico', type: 'Countries' },
        { id: '77', name: 'Egypt', type: 'Countries' },
        { id: '78', name: 'Australia', type: 'Countries' },
        { id: '79', name: 'Netherlands', type: 'Countries' },
        { id: '80', name: 'Belgium', type: 'Countries' },
        { id: '81', name: 'South Korea', type: 'Countries' },
        { id: '82', name: 'Malaysia', type: 'Countries' },
        { id: '83', name: 'Singapore', type: 'Countries' },
        { id: '84', name: 'Honda', type: 'Cars' },
        { id: '85', name: 'BMW', type: 'Cars' },
        { id: '86', name: 'Lamborghini', type: 'Cars' },
        { id: '87', name: 'Ferrari', type: 'Cars' },
        { id: '88', name: 'Chevrolet', type: 'Cars' },
        { id: '89', name: 'Mazda', type: 'Cars' },
        { id: '90', name: 'Grapes', type: 'Fruits' },
        { id: '91', name: 'Watermelon', type: 'Fruits' },
        { id: '92', name: 'Orange', type: 'Fruits' },
        { id: '93', name: 'Cucumber', type: 'Vegetables' },
        { id: '94', name: 'Lettuce', type: 'Vegetables' },
        { id: '95', name: 'Potato', type: 'Vegetables' },
        { id: '96', name: 'Tomato', type: 'Vegetables' },
        { id: '97', name: 'Ukraine', type: 'Countries' },
        { id: '98', name: 'Georgia', type: 'Countries' },
        { id: '99', name: 'Poland', type: 'Countries' },
        { id: '100', name: 'Finland', type: 'Countries' }
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

    fb = inject(FormBuilder);

    formGroup = this.fb.group({ multiGroupComboBox: [[]] }, { updateOn: 'blur' });

    ngOnInit(): void {
        this.formGroup.get('multiGroupComboBox')?.valueChanges.subscribe(() => {
            console.log('value change event is triggered now -> ', this.formGroup.get('multiGroupComboBox')?.value);
        });
    }

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
