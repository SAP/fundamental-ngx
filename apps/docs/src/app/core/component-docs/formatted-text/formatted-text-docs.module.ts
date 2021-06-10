import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SharedDocumentationPageModule } from '../../../documentation/shared-documentation-page.module';
import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { API_FILES } from '../../api-files';
import { FormattedTextHeaderComponent } from './formatted-text-header/formatted-text-header.component';
import { FormattedTextDocsComponent } from './formatted-text-docs.component';
import { FormattedTextExampleComponent } from './examples/base/formatted-text-example.component';
import { FormattedTextLinksExampleComponent } from './examples/links/formatted-text-links-example.component';
import { FormattedTextScriptExampleComponent } from './examples/script/formatted-text-script-example.component';
import { FormattedTextModule } from '@fundamental-ngx/core/formatted-text';
import { FormModule } from '@fundamental-ngx/core/form';
import { PopoverModule } from '@fundamental-ngx/core/popover';
import { InputGroupModule } from '@fundamental-ngx/core/input-group';

const routes: Routes = [
    {
        path: '',
        component: FormattedTextHeaderComponent,
        children: [
            { path: '', component: FormattedTextDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.formattedText } }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        SharedDocumentationPageModule,
        FormattedTextModule,
        FormModule,
        PopoverModule,
        InputGroupModule
    ],
    exports: [RouterModule],
    declarations: [
        FormattedTextDocsComponent,
        FormattedTextHeaderComponent,
        FormattedTextExampleComponent,
        FormattedTextLinksExampleComponent,
        FormattedTextScriptExampleComponent
    ]
})
export class FormattedTextDocsModule {}
