import { Component } from '@angular/core';

import { ExampleFile } from '@fundamental-ngx/docs/shared';
import { HeaderTabsComponent } from '../../../shared/src/lib/core-helpers/header-tabs/header-tabs.component';
import { ImportComponent } from '../../../shared/src/lib/core-helpers/import/import.component';
import { CodeSnippetComponent } from '../../../shared/src/lib/core-helpers/code-snippet/code-snippet.component';
import { DescriptionComponent } from '../../../shared/src/lib/core-helpers/description/description';
import { RouterLink } from '@angular/router';
import { MessageStripComponent } from '@fundamental-ngx/core/message-strip';
import { HeaderComponent } from '../../../shared/src/lib/core-helpers/header/header.component';
import { DocPageComponent } from '../../../shared/src/lib/core-helpers/doc-page/doc-page.component';

@Component({
    selector: 'app-moment-datetime-adapter-header',
    templateUrl: './moment-datetime-adapter-header.component.html',
    standalone: true,
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
