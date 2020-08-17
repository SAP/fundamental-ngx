import { Component } from '@angular/core';
import { of } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { MobileModeConfig } from '@fundamental-ngx/core';

@Component({
    selector: 'fd-combobox-height-example',
    templateUrl: './combobox-height-example.component.html'
})
export class ComboboxHeightExampleComponent {
    showSecondaryText = true;
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

    dataSource2 = [
        { test: 'red', name: 'Apple', type: 'Fruits' },
        { test: 'blue', name: 'Apple', type: 'Fruits' },
        { test: 'asd', name: 'Banana', type: 'Fruits' },
        { test: 'zxc', name: 'Pineapple', type: 'Fruits' },
        { test: 'xcv', name: 'Strawberry', type: 'Fruits' },
        { test: 'cvb', name: 'Broccoli', type: 'Vegetables' },
        { test: 'dfg', name: 'Carrot', type: 'Vegetables' },
        { test: 'er', name: 'Jalapeño', type: 'Vegetables' },
        { test: 'ever', name: 'Spinach', type: 'Vegetables' }
    ];

    dataSource3 = [
        { name: 'Apple', type: 'Fruits', firstName: 'test' },
        { name: 'Banana', type: 'Fruits', firstName: 'test2' },
        { name: 'Pineapple', type: 'Fruits', firstName: 'test3' },
        { name: 'Strawberry', type: 'Fruits', firstName: 'test4' },
        { name: 'Broccoli', type: 'Vegetables', firstName: 'test5' },
        { name: 'Carrot', type: 'Vegetables', firstName: 'test6' },
        { name: 'Jalapeño', type: 'Vegetables', firstName: 'test7' },
        { name: 'Spinach', type: 'Vegetables', firstName: 'test8' }
    ];

    dataSourceOf = of([
        { name: 'Apple', type: 'Fruits' },
        { name: 'Banana', type: 'Fruits' },
        { name: 'Pineapple', type: 'Fruits' },
        { name: 'Strawberry', type: 'Fruits' },
        { name: 'Broccoli', type: 'Vegetables' },
        { name: 'Carrot', type: 'Vegetables' },
        { name: 'Jalapeño', type: 'Vegetables' },
        { name: 'Spinach', type: 'Vegetables' }
    ]);

    test = '';

    customForm = new FormGroup({
        field: new FormControl('')
    });

    mobileConfig: MobileModeConfig = {
        title: 'Title',
        approveButtonText: 'Save',
        cancelButtonText: 'Cancel',
        hasCloseButton: true
    };

    onSelect(event: any): void {
        console.log(1111111111, event);
    }
}
