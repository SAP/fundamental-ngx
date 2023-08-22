import { Component } from '@angular/core';

import { ExampleFile } from '@fundamental-ngx/docs/shared';
import { HeaderTabsComponent } from '../../../shared/src/lib/core-helpers/header-tabs/header-tabs.component';
import { ImportComponent } from '../../../shared/src/lib/core-helpers/import/import.component';
import { CodeSnippetComponent } from '../../../shared/src/lib/core-helpers/code-snippet/code-snippet.component';
import { DescriptionComponent } from '../../../shared/src/lib/core-helpers/description/description';
import { HeaderComponent } from '../../../shared/src/lib/core-helpers/header/header.component';
import { DocPageComponent } from '../../../shared/src/lib/core-helpers/doc-page/doc-page.component';

@Component({
    selector: 'app-datetime-datetime-adapter-header',
    templateUrl: './dayjs-datetime-adapter-header.component.html',
    standalone: true,
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
