import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InitialFocusDirective } from '@fundamental-ngx/cdk/utils';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { ComboboxComponent } from '@fundamental-ngx/core/combobox';
import { DatePickerComponent } from '@fundamental-ngx/core/date-picker';
import {
    DATE_TIME_FORMATS,
    DatetimeAdapter,
    FD_DATETIME_FORMATS,
    FdDate,
    FdDatetimeAdapter
} from '@fundamental-ngx/core/datetime';
import { FormItemComponent } from '@fundamental-ngx/core/form';
import { SelectModule } from '@fundamental-ngx/core/select';
import { SliderComponent } from '@fundamental-ngx/core/slider';

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
    imports: [
        ButtonComponent,
        SelectModule,
        InitialFocusDirective,
        ComboboxComponent,
        DatePickerComponent,
        FormsModule,
        FormItemComponent,
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
