import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
    DATE_TIME_FORMATS,
    DatetimeAdapter,
    FD_DATETIME_FORMATS,
    FdDate,
    FdDatetimeAdapter
} from '@fundamental-ngx/core/datetime';

@Component({
    selector: 'fd-initial-focus-complex-example',
    templateUrl: './initial-focus-complex-example.component.html',
    styleUrls: ['./initial-focus-example.component.scss'],
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
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class InitialFocusComplexExampleComponent {
    currentExample: string;
    date = FdDate.getNow();
    value = [20, 70];

    options = ['Apple', 'Banana', 'Orange'];

    showExample(example: string): void {
        this.currentExample = example;
    }
}
