import { Component } from '@angular/core';

@Component({
    selector: 'fd-object-identifier-table-example',
    templateUrl: './object-identifier-table-example.component.html'
})
export class ObjectIdentifierTableExampleComponent {
    tableRows = [
        {
            column1: 'Apple',
            column1Description: 'Fruit',
            column2: 'USA',
            column3: '1.50$'
        },
        {
            column1: 'Carrot',
            column1Description: 'Vegetable',
            column2: 'Uzbekistan',
            column3: '3$'
        },
        {
            column1: 'Kiwi',
            column1Description: 'Fruit',
            column2: 'New Zealand',
            column3: '5$'
        }
    ];
}
