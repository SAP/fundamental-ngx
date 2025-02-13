import { Component } from '@angular/core';

import { RouterLink } from '@angular/router';
import { MessageStripComponent } from '@fundamental-ngx/core/message-strip';
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
    selector: 'app-moment-datetime-adapter-header',
    templateUrl: './moment-datetime-adapter-header.component.html',
    imports: [
        DocPageComponent,
        HeaderComponent,
        MessageStripComponent,
        RouterLink,
        DescriptionComponent,
        CodeSnippetComponent,
        ImportComponent,
        HeaderTabsComponent
    ]
})
export class MomentDatetimeAdapterHeaderComponent {
    installSnippet: ExampleFile = {
        code: `
npm i @fundamental-ngx/moment-adapter

# using yarn?
# yarn add @fundamental-ngx/moment-adapter
                    `,
        language: 'bash'
    };
}
