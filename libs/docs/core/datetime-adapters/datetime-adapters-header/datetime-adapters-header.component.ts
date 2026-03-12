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
    selector: 'app-datetime-adapters-header',
    templateUrl: './datetime-adapters-header.component.html',
    imports: [
        DocPageComponent,
        HeaderComponent,
        DescriptionComponent,
        CodeSnippetComponent,
        ImportComponent,
        HeaderTabsComponent,
        MessageStripComponent,
        RouterLink
    ]
})
export class DatetimeAdaptersHeaderComponent {
    installSnippet: ExampleFile = {
        code: `npm i @fundamental-ngx/datetime-adapter

# using yarn?
# yarn add @fundamental-ngx/datetime-adapter`,
        language: 'bash'
    };
}
