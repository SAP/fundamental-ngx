import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent, currentComponentProvider, SharedDocumentationPageModule } from '@fundamental-ngx/docs/shared';
import { API_FILES } from '@fundamental-ngx/docs/core/shared';
import { InlineHelpHeaderComponent } from './inline-help-header/inline-help-header.component';
import { InlineHelpDocsComponent } from './inline-help-docs.component';
import { InlineHelpExampleComponent } from './examples/inline-help-example.component';
import { InlineHelpStyledExampleComponent } from './examples/inline-help-styled-example.component';
import { InlineHelpTriggerExampleComponent } from './examples/inline-help-trigger-example.component';
import { InlineHelpTemplateExampleComponent } from './examples/inline-help-template-example/inline-help-template-example.component';
import { FormModule } from '@fundamental-ngx/core/form';
import { InlineHelpModule } from '@fundamental-ngx/core/inline-help';
import { ObjectStatusModule } from '@fundamental-ngx/core/object-status';

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
        ObjectStatusModule
    ],
    exports: [RouterModule],
    declarations: [
        InlineHelpDocsComponent,
        InlineHelpHeaderComponent,
        InlineHelpExampleComponent,
        InlineHelpStyledExampleComponent,
        InlineHelpTriggerExampleComponent,
        InlineHelpTemplateExampleComponent
    ],
    providers: [currentComponentProvider('inline-help')]
})
export class InlineHelpDocsModule {}
