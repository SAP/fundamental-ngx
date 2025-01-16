import { Component, OnInit } from '@angular/core';
import { FocusableGridDirective } from '@fundamental-ngx/cdk/utils';
import { IconComponent } from '@fundamental-ngx/core/icon';
import { LinkComponent } from '@fundamental-ngx/core/link';
import { TableModule } from '@fundamental-ngx/core/table';
import { TitleComponent } from '@fundamental-ngx/core/title';
import { ToolbarComponent, ToolbarItemDirective, ToolbarLabelDirective } from '@fundamental-ngx/core/toolbar';

@Component({
    selector: 'fd-table-page-scroll-example',
    templateUrl: './table-page-scroll-example.component.html',
    imports: [
        TableModule,
        FocusableGridDirective,
        LinkComponent,
        IconComponent,
        ToolbarComponent,
        TitleComponent,
        ToolbarItemDirective,
        ToolbarLabelDirective
    ]
})
export class TablePageScrollExampleComponent implements OnInit {
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
                date: '02-14-18',
                type: 'calendar'
            },
            {
                column1: 'user.name@email.com',
                column2: 'Row 6',
                column3: 'Row 6',
                date: '12-30-17',
                type: 'search'
            },
            {
                column1: 'user.name@email.com',
                column2: 'Row 7',
                column3: 'Row 7',
                date: '11-12-18',
                type: 'search'
            },
            {
                column1: 'user.name@email.com',
                column2: 'Row 8',
                column3: 'Row 8',
                date: '11-12-19',
                type: 'search'
            },
            {
                column1: 'user.name@email.com',
                column2: 'Row 9',
                column3: 'Row 9',
                date: '11-12-20',
                type: 'calendar'
            },
            {
                column1: 'user.name@email.com',
                column2: 'Row 10',
                column3: 'Row 10',
                date: '11-12-21',
                type: 'search'
            },
            {
                column1: 'user.name@email.com',
                column2: 'Row 11',
                column3: 'Row 11',
                date: '11-12-21',
                type: 'search'
            },
            {
                column1: 'user.name@email.com',
                column2: 'Row 12',
                column3: 'Row 12',
                date: '11-12-21',
                type: 'search'
            },
            {
                column1: 'user.name@email.com',
                column2: 'Row 13',
                column3: 'Row 13',
                date: '11-12-21',
                type: 'search'
            },
            {
                column1: 'user.name@email.com',
                column2: 'Row 14',
                column3: 'Row 14',
                date: '11-12-21',
                type: 'search'
            },
            {
                column1: 'user.name@email.com',
                column2: 'Row 15',
                column3: 'Row 15',
                date: '11-12-21',
                type: 'search'
            },
            {
                column1: 'user.name@email.com',
                column2: 'Row 16',
                column3: 'Row 16',
                date: '11-12-21',
                type: 'search'
            },
            {
                column1: 'user.name@email.com',
                column2: 'Row 17',
                column3: 'Row 17',
                date: '11-12-21',
                type: 'search'
            },
            {
                column1: 'user.name@email.com',
                column2: 'Row 18',
                column3: 'Row 18',
                date: '11-12-21',
                type: 'search'
            },
            {
                column1: 'user.name@email.com',
                column2: 'Row 19',
                column3: 'Row 19',
                date: '11-12-21',
                type: 'search'
            },
            {
                column1: 'user.name@email.com',
                column2: 'Row 20',
                column3: 'Row 20',
                date: '11-12-21',
                type: 'search'
            }
        ];
    }
}
