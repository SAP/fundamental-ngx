import { Component } from '@angular/core';
import {
    DATE_TIME_FORMATS,
    DatetimeAdapter,
    FD_DATETIME_FORMATS,
    FdDatetimeAdapter
} from '@fundamental-ngx/core/datetime';

@Component({
    selector: 'fd-toolbar-overflow-example',
    templateUrl: './toolbar-overflow-example.component.html',
    providers: [
        {
            provide: DatetimeAdapter,
            useClass: FdDatetimeAdapter
        },
        {
            provide: DATE_TIME_FORMATS,
            useValue: FD_DATETIME_FORMATS
        }
    ]
})
export class ToolbarOverflowExampleComponent {}
