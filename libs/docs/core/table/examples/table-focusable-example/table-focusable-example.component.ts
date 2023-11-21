import { Component } from '@angular/core';
import { FocusableGridDirective } from '@fundamental-ngx/cdk/utils';
import { IconComponent } from '@fundamental-ngx/core/icon';
import { LinkComponent } from '@fundamental-ngx/core/link';
import { MenuModule } from '@fundamental-ngx/core/menu';
import { SplitButtonModule } from '@fundamental-ngx/core/split-button';
import { StepInputModule } from '@fundamental-ngx/core/step-input';
import { TableModule } from '@fundamental-ngx/core/table';

@Component({
    selector: 'fd-table-focusable-example',
    templateUrl: './table-focusable-example.component.html',
    standalone: true,
    imports: [
        FocusableGridDirective,
        TableModule,
        LinkComponent,
        StepInputModule,
        IconComponent,
        SplitButtonModule,
        MenuModule
    ]
})
export class TableFocusableExampleComponent {
    tableRows = [
        {
            column1: 'user.name@email.com',
            column2:
                'LongText LongText LongText LongText LongText LongText LongText LongText LongText LongText LongText',
            column3: 'Row 2',
            date: '09-07-18',
            type: 'search'
        },
        {
            column1: 'user.name@email.com',
            column2: 'Row 2',
            column3:
                'Wrapped Long Text Wrapped Long Text Wrapped Long Text Wrapped Long Text Wrapped Long Text Wrapped Long',
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
