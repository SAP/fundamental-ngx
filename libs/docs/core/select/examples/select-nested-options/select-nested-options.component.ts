import { Component } from '@angular/core';

@Component({
    selector: 'fd-select-nested-options',
    templateUrl: './select-nested-options.component.html',
    styleUrls: ['select-nested-options.component.scss']
})
export class SelectNestedOptionsComponent {
    selectedValue: string;

    fruits: { name: string; kCal: string }[] = [
        { name: 'Apple', kCal: '49.05' },
        { name: 'Pineapple', kCal: '50' },
        { name: 'Strawberry', kCal: '32' }
    ];

    vegetables: { name: string; kCal: string }[] = [
        { name: 'Cabbage', kCal: '23' },
        { name: 'Carrot', kCal: '35' },
        { name: 'Leek', kCal: '31' }
    ];
}
