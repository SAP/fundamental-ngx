import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import {
    DatetimeAdapter,
    DATE_TIME_FORMATS,
    FdDate,
    FdDatetimeAdapter,
    FD_DATETIME_FORMATS
} from '@fundamental-ngx/core/datetime';

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
