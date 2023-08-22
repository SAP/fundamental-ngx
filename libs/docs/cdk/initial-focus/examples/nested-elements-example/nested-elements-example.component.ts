import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import {
    DatetimeAdapter,
    DATE_TIME_FORMATS,
    FdDate,
    FdDatetimeAdapter,
    FD_DATETIME_FORMATS
} from '@fundamental-ngx/core/datetime';
import { SliderComponent } from '@fundamental-ngx/core/slider';
import { FormItemModule } from '@fundamental-ngx/core/form';
import { FormsModule } from '@angular/forms';
import { DatePickerComponent } from '@fundamental-ngx/core/date-picker';
import { ComboboxModule } from '@fundamental-ngx/core/combobox';
import { InitialFocusDirective } from '@fundamental-ngx/cdk/utils';
import { SelectModule } from '@fundamental-ngx/core/select';
import { NgIf, NgFor } from '@angular/common';
import { ButtonModule } from '@fundamental-ngx/core/button';

@Component({
    selector: 'fdk-initial-focus-nested-elements-example',
    templateUrl: './nested-elements-example.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    styles: [
        `
            .fdk-initial-focus-control-buttons .fd-button {
                margin: 0.375rem;
            }

            .fdk-initial-focus-examples {
                margin: 0.375rem;
            }
        `
    ],
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
        ButtonModule,
        NgIf,
        SelectModule,
        InitialFocusDirective,
        NgFor,
        ComboboxModule,
        DatePickerComponent,
        FormsModule,
        FormItemModule,
        SliderComponent
    ]
})
export class NestedElementsExampleComponent {
    currentExample: string;
    date = FdDate.getNow();
    value = [20, 70];

    options = ['Apple', 'Banana', 'Orange'];

    showExample(example: string): void {
        this.currentExample = example;
    }
}
