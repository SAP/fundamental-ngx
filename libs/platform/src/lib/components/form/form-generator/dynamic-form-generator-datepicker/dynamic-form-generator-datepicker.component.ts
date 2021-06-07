import { Component } from '@angular/core';
import { BaseDynamicFormGeneratorControl } from '../base-dynamic-form-generator-control';
import { dynamicFormFieldProvider, dynamicFormGroupChildProvider } from '../providers/providers';
import { DATE_TIME_FORMATS, DatetimeAdapter, FD_DATETIME_FORMATS, FdDatetimeAdapter } from '@fundamental-ngx/core';

@Component({
    selector: 'fdp-dynamic-form-generator-datepicker',
    templateUrl: './dynamic-form-generator-datepicker.component.html',
    viewProviders: [dynamicFormFieldProvider, dynamicFormGroupChildProvider],
    providers: [
        // Note that this is usually provided in the root of your application.
        // Due to the limit of this example we must provide it on this level.
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
export class DynamicFormGeneratorDatepickerComponent extends BaseDynamicFormGeneratorControl {

    constructor() {
        super();
    }
}
