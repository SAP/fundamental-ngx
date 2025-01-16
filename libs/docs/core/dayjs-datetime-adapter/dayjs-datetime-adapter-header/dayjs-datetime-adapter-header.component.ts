import { Component } from '@angular/core';

import {
    CodeSnippetComponent,
    DescriptionComponent,
    DocPageComponent,
    ExampleFile,
    HeaderComponent,
    HeaderTabsComponent,
    ImportComponent
} from '@fundamental-ngx/docs/shared';

@Component({
    selector: 'app-datetime-datetime-adapter-header',
    templateUrl: './dayjs-datetime-adapter-header.component.html',
    imports: [
        DocPageComponent,
        HeaderComponent,
        DescriptionComponent,
        CodeSnippetComponent,
        ImportComponent,
        HeaderTabsComponent
    ]
})
export class DayjsDatetimeAdapterHeaderComponent {
    installSnippet: ExampleFile = {
        code: `npm i @fundamental-ngx/datetime-adapter

# using yarn?
# yarn add @fundamental-ngx/datetime-adapter`,
        language: 'bash'
    };
}
