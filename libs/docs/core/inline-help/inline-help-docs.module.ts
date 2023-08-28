import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormModule } from '@fundamental-ngx/core/form';
import { InlineHelpModule } from '@fundamental-ngx/core/inline-help';
import { ObjectStatusModule } from '@fundamental-ngx/core/object-status';
import { API_FILES } from '@fundamental-ngx/docs/core/shared';
import { ApiComponent, SharedDocumentationPageModule, currentComponentProvider } from '@fundamental-ngx/docs/shared';
import { InlineHelpExampleComponent } from './examples/inline-help-example.component';
import { InlineHelpStyledExampleComponent } from './examples/inline-help-styled-example.component';
import { InlineHelpTemplateExampleComponent } from './examples/inline-help-template-example/inline-help-template-example.component';
import { InlineHelpTriggerExampleComponent } from './examples/inline-help-trigger-example.component';
import { InlineHelpDocsComponent } from './inline-help-docs.component';
import { InlineHelpHeaderComponent } from './inline-help-header/inline-help-header.component';

const routes: Routes = [
    {
        path: '',
        component: InlineHelpHeaderComponent,
        children: [
            { path: '', component: InlineHelpDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.inlineHelp } }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        SharedDocumentationPageModule,
        FormModule,
        InlineHelpModule,
        ObjectStatusModule,
        InlineHelpDocsComponent,
        InlineHelpHeaderComponent,
        InlineHelpExampleComponent,
        InlineHelpStyledExampleComponent,
        InlineHelpTriggerExampleComponent,
        InlineHelpTemplateExampleComponent
    ],
    exports: [RouterModule],
    providers: [currentComponentProvider('inline-help')]
})
export class InlineHelpDocsModule {}
