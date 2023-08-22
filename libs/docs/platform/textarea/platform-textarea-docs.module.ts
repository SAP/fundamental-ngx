import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
    ApiComponent,
    currentComponentProvider,
    getI18nKey,
    I18nDocsComponent,
    SharedDocumentationPageModule
} from '@fundamental-ngx/docs/shared';
import { API_FILES } from '@fundamental-ngx/docs/platform/shared';

import { FormMessageModule } from '@fundamental-ngx/core/form';
import { PlatformButtonModule } from '@fundamental-ngx/platform/button';
import { FdpFormGroupModule, PlatformTextAreaModule } from '@fundamental-ngx/platform/form';
import { PlatformTextareaHeaderComponent } from './platform-textarea-header/platform-textarea-header.component';
import { PlatformTextareaDocsComponent } from './platform-textarea-docs.component';
import { PlatformTextareaBasicExampleComponent } from './examples/platform-textarea-basic-example.component';
import { PlatformTextareaCounterExampleComponent } from './examples/platform-textarea-counter-example.component';
import { PlatformTextareaCounterTemplateExampleComponent } from './examples/platform-textarea-counter-template-example.component';
import { PlatformTextareaAutogrowExampleComponent } from './examples/platform-textarea-autogrow-example.component';

const routes: Routes = [
    {
        path: '',
        component: PlatformTextareaHeaderComponent,
        children: [
            { path: '', component: PlatformTextareaDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.textarea } },
            { path: 'i18n', component: I18nDocsComponent, data: getI18nKey('platformTextarea') }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        SharedDocumentationPageModule,
        PlatformTextAreaModule,
        FdpFormGroupModule,
        PlatformButtonModule,
        FormMessageModule
    ],
    exports: [RouterModule],
    declarations: [
        PlatformTextareaDocsComponent,
        PlatformTextareaHeaderComponent,
        PlatformTextareaBasicExampleComponent,
        PlatformTextareaCounterExampleComponent,
        PlatformTextareaCounterTemplateExampleComponent,
        PlatformTextareaAutogrowExampleComponent
    ],
    providers: [currentComponentProvider('textarea')]
})
export class PlatformTextareaDocsModule {}
