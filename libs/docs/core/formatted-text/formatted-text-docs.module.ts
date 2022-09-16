import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ApiComponent, currentComponentProvider, SharedDocumentationPageModule } from '@fundamental-ngx/docs/shared';
import { API_FILES } from '@fundamental-ngx/docs/core/shared';
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
    ],
    providers: [currentComponentProvider('formatted-text')]
})
export class FormattedTextDocsModule {}
