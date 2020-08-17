import { Component } from '@angular/core';
import { ComboboxSelectionChangeEvent } from '@fundamental-ngx/platform';

@Component({
    selector: 'fdp-combobox-standard',
    templateUrl: './combobox-standard.component.html'
})
export class ComboboxStandardComponent {
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

    dataSourceAutoResize = [
        'The maximum width is the part of the screen furthest to the right.',
        'Apple',
        'Banana',
        'Pineapple',
        'Strawberry',
        'Broccoli',
        'Carrot',
        'Jalapeño',
        'Spinach'
    ];

    selectedItem1 = '';
    selectedItem2 = '';
    selectedItem3 = '';
    selectedItem4 = '';
    selectedItem5 = '';
    selectedItem6 = '';

    onSelect1(item: ComboboxSelectionChangeEvent): void {
       this.selectedItem1 = item.payload;
    }

    onSelect2(item: ComboboxSelectionChangeEvent): void {
        this.selectedItem2 = item.payload;
    }

    onSelect3(item: ComboboxSelectionChangeEvent): void {
        this.selectedItem3 = item.payload;
    }

    onSelect4(item: ComboboxSelectionChangeEvent): void {
        this.selectedItem4 = item.payload;
    }

    onSelect5(item: ComboboxSelectionChangeEvent): void {
        this.selectedItem5 = item.payload;
    }

    onSelect6(item: ComboboxSelectionChangeEvent): void {
        this.selectedItem6 = item.payload;
    }
}
