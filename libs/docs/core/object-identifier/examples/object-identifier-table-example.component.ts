import { Component } from '@angular/core';
import { FocusableGridDirective } from '@fundamental-ngx/cdk/utils';
import { ObjectIdentifierComponent } from '@fundamental-ngx/core/object-identifier';
import { TableModule } from '@fundamental-ngx/core/table';

@Component({
    selector: 'fd-object-identifier-table-example',
    templateUrl: './object-identifier-table-example.component.html',
    imports: [FocusableGridDirective, TableModule, ObjectIdentifierComponent]
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
