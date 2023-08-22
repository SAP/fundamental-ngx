import { Component } from '@angular/core';
import {
    DATE_TIME_FORMATS,
    DatetimeAdapter,
    FD_DATETIME_FORMATS,
    FdDatetimeAdapter
} from '@fundamental-ngx/core/datetime';
import { ToolbarSpacerDirective } from '@fundamental-ngx/core/toolbar';
import { SegmentedButtonModule } from '@fundamental-ngx/core/segmented-button';
import { ToolbarOverflowButtonMenuDirective } from '@fundamental-ngx/core/toolbar';
import { ToolbarOverflowButtonDirective } from '@fundamental-ngx/core/toolbar';
import { FormControlModule } from '@fundamental-ngx/core/form';
import { FormLabelModule } from '@fundamental-ngx/core/form';
import { ToolbarLabelDirective } from '@fundamental-ngx/core/toolbar';
import { MenuModule } from '@fundamental-ngx/core/menu';
import { SplitButtonModule } from '@fundamental-ngx/core/split-button';
import { CheckboxComponent } from '@fundamental-ngx/core/checkbox';
import { NgFor } from '@angular/common';
import { SelectModule } from '@fundamental-ngx/core/select';
import { DatetimePickerComponent } from '@fundamental-ngx/core/datetime-picker';
import { ToolbarItemDirective } from '@fundamental-ngx/core/toolbar';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { ToolbarComponent } from '@fundamental-ngx/core/toolbar';

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
        FormLabelModule,
        FormControlModule,
        ToolbarOverflowButtonDirective,
        ToolbarOverflowButtonMenuDirective,
        SegmentedButtonModule,
        ToolbarSpacerDirective
    ]
})
export class ToolbarOverflowExampleComponent {}
