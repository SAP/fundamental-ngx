import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { API_FILES } from '@fundamental-ngx/docs/platform/shared';
import {
    ApiComponent,
    currentComponentProvider,
    getI18nKey,
    I18nDocsComponent,
    SharedDocumentationPageModule
} from '@fundamental-ngx/docs/shared';

import { PlatformLinkModule } from '@fundamental-ngx/platform/link';
import { PlatformLinkHeaderComponent } from './platform-link-header/platform-link-header.component';
import { PlatformLinkDocsComponent } from './platform-link-docs.component';
import {
    PlatformLinkDisabledEmphasizedExampleComponent,
    PlatformLinkDisabledExampleComponent,
    PlatformLinkEmphasizedExampleComponent,
    PlatformLinkIconExampleComponent,
    PlatformLinkInvertedExampleComponent,
    PlatformLinkStandardExampleComponent,
    PlatformLinkTruncatedExampleComponent
} from './examples/platform-link-examples.component';

const routes: Routes = [
    {
        path: '',
        component: PlatformLinkHeaderComponent,
        children: [
            { path: '', component: PlatformLinkDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.link } },
            { path: 'i18n', component: I18nDocsComponent, data: getI18nKey('platformLink') }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes), SharedDocumentationPageModule, PlatformLinkModule],
    exports: [RouterModule],
    declarations: [
        PlatformLinkDocsComponent,
        PlatformLinkHeaderComponent,
        PlatformLinkDisabledEmphasizedExampleComponent,
        PlatformLinkDisabledExampleComponent,
        PlatformLinkEmphasizedExampleComponent,
        PlatformLinkIconExampleComponent,
        PlatformLinkInvertedExampleComponent,
        PlatformLinkStandardExampleComponent,
        PlatformLinkTruncatedExampleComponent
    ],
    providers: [currentComponentProvider('link')]
})
export class PlatformLinkDocsModule {}
