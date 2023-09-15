import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { CheckboxComponent } from '@fundamental-ngx/core/checkbox';
import {
    DATE_TIME_FORMATS,
    DatetimeAdapter,
    FD_DATETIME_FORMATS,
    FdDatetimeAdapter
} from '@fundamental-ngx/core/datetime';
import { DatetimePickerComponent } from '@fundamental-ngx/core/datetime-picker';
import { FormControlComponent, FormLabelComponent } from '@fundamental-ngx/core/form';
import { MenuModule } from '@fundamental-ngx/core/menu';
import { SegmentedButtonModule } from '@fundamental-ngx/core/segmented-button';
import { SelectModule } from '@fundamental-ngx/core/select';
import { SplitButtonModule } from '@fundamental-ngx/core/split-button';
import {
    ToolbarComponent,
    ToolbarItemDirective,
    ToolbarLabelDirective,
    ToolbarOverflowButtonDirective,
    ToolbarOverflowButtonMenuDirective,
    ToolbarSpacerDirective
} from '@fundamental-ngx/core/toolbar';

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
    ],
    standalone: true,
    imports: [
        ToolbarComponent,
        ButtonModule,
        ToolbarItemDirective,
        DatetimePickerComponent,
        SelectModule,
        NgFor,
        CheckboxComponent,
        SplitButtonModule,
        MenuModule,
        ToolbarLabelDirective,
        FormLabelComponent,
        FormControlComponent,
        ToolbarOverflowButtonDirective,
        ToolbarOverflowButtonMenuDirective,
        SegmentedButtonModule,
        ToolbarSpacerDirective
    ]
})
export class ToolbarOverflowExampleComponent {}
