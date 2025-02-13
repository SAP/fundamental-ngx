import { Component } from '@angular/core';

import {
    CodeExampleComponent,
    ComponentExampleComponent,
    DescriptionComponent,
    DocsSectionTitleComponent,
    SeparatorComponent
} from '@fundamental-ngx/docs/shared';
import { DatePickerMomentAdapterExampleComponent } from './examples/date-picker-moment-adapter-example.component';
import { MomentAdapterOptionsExampleComponent } from './examples/moment-adapter-options-example.component';
import { MomentDatetimeFormatsExampleComponent } from './examples/moment-datetime-formats-example.component';

@Component({
    selector: 'app-moment-datetime-adapter',
    templateUrl: './moment-datetime-adapter-docs.component.html',
    imports: [
        DocsSectionTitleComponent,
        DescriptionComponent,
        ComponentExampleComponent,
        DatePickerMomentAdapterExampleComponent,
        CodeExampleComponent,
        SeparatorComponent,
        MomentAdapterOptionsExampleComponent,
        MomentDatetimeFormatsExampleComponent
    ]
})
export class MomentDatetimeAdapterDocsComponent {}
