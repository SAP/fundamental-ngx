import { Component, OnInit } from '@angular/core';
import { FocusableGridDirective } from '@fundamental-ngx/cdk/utils';
import { IconComponent } from '@fundamental-ngx/core/icon';
import { LinkComponent } from '@fundamental-ngx/core/link';
import { TableModule } from '@fundamental-ngx/core/table';

@Component({
    selector: 'fd-table-without-borders-example',
    templateUrl: './table-without-borders-example.component.html',
    imports: [FocusableGridDirective, TableModule, LinkComponent, IconComponent]
})
export class TableWithoutBordersExampleComponent implements OnInit {
    tableRows: any[];

    ngOnInit(): void {
        this.tableRows = [
            {
                column1: 'user.name@email.com',
                column2: 'Row 1',
                column3: 'Row 1',
                date: '09-07-18',
                type: 'search'
            },
            {
                column1: 'user.name@email.com',
                column2: 'Row 2',
                column3: 'Row 2',
                date: '09-08-18',
                type: 'cart'
            },
            {
                column1: 'user.name@email.com',
                column2: 'Row 3',
                column3: 'Row 3',
                date: '02-14-18',
                type: 'calendar'
            },
            {
                column1: 'user.name@email.com',
                column2: 'Row 4',
                column3: 'Row 4',
                date: '12-30-17',
                type: 'search'
            },
            {
                column1: 'user.name@email.com',
                column2: 'Row 5',
                column3: 'Row 5',
                date: '11-12-18',
                type: 'search'
            }
        ];
    }
}
