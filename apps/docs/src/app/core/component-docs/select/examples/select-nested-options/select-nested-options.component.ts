import { Component } from '@angular/core';

@Component({
    selector: 'fd-select-nested-options',
    templateUrl: './select-nested-options.component.html',
    styleUrls: ['select-nested-options.component.scss']
})
export class SelectNestedOptionsComponent {
    value: string;

    options: any[] = [
        { name: 'Tomato', value: 'tomato', viewValue: 'Tomatoes are good' },
        { name: 'Pineapple', value: 'pineapple', viewValue: 'Pineapples are not so good' },
        { name: 'Apple', value: 'apple', viewValue: 'Apples are good' },
        { name: 'Strawberry', value: 'strawberry', viewValue: 'Strawberries are good' },
        { name: 'Kiwi', value: 'kiwi', viewValue: 'Kiwi are not so good' },
        { name: 'Watermelon', value: 'watermelon', viewValue: 'Watermelons are good' },
        { name: 'Blackberry', value: 'blackberry', viewValue: 'Blackberries are good' }
    ];
}
