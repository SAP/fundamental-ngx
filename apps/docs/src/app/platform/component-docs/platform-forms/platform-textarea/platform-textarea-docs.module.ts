import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent } from '../../../../documentation/core-helpers/api/api.component';
import { API_FILES } from '../../../api-files';
import { SharedDocumentationModule } from '../../../../documentation/shared-documentation.module';

import { PlatformTextAreaModule, FdpFormGroupModule, PlatformButtonModule } from '@fundamental-ngx/platform';
import { PlatformTextareaHeaderComponent } from './platform-textarea-header/platform-textarea-header.component';
import { PlatformTextareaDocsComponent } from './platform-textarea-docs.component';
import { PlatformTextareaBasicExampleComponent } from './platform-textarea-examples/platform-textarea-basic-example.component';
import { PlatformTextareaCounterExampleComponent } from './platform-textarea-examples/platform-textarea-counter-example.component';
import { PlatformTextareaCounterTemplateExampleComponent } from './platform-textarea-examples/platform-textarea-counter-template-example.component';
import { PlatformTextareaAutogrowExampleComponent } from './platform-textarea-examples/platform-textarea-autogrow-example.component';
import { PlatformTextareaI18nExampleComponent } from './platform-textarea-examples/platform-textarea-i18n-example.component';

const routes: Routes = [
    {
        path: '',
        component: PlatformTextareaHeaderComponent,
        children: [
            { path: '', component: PlatformTextareaDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.textarea } }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        SharedDocumentationModule,
        PlatformTextAreaModule,
        FdpFormGroupModule,
        PlatformButtonModule
    ],
    exports: [RouterModule],
    declarations: [
        PlatformTextareaDocsComponent,
        PlatformTextareaHeaderComponent,
        PlatformTextareaBasicExampleComponent,
        PlatformTextareaCounterExampleComponent,
        PlatformTextareaCounterTemplateExampleComponent,
        PlatformTextareaAutogrowExampleComponent,
        PlatformTextareaI18nExampleComponent
    ]
})
export class PlatformTextareaDocsModule {}
