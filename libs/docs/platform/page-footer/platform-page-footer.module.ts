import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { API_FILES } from '@fundamental-ngx/docs/platform/shared';
import { ApiComponent, currentComponentProvider, SharedDocumentationPageModule } from '@fundamental-ngx/docs/shared';

import { LinkModule } from '@fundamental-ngx/core/link';
import { PlatformLinkModule } from '@fundamental-ngx/platform/link';
import { PlatformPageFooterModule } from '@fundamental-ngx/platform/page-footer';
import { PlatformPageFooterDocsComponent } from './platform-page-footer-docs.component';
import {
    PlatformPageFooterExampleComponent,
    PlatformPageFooterMultipleLineExampleComponent,
    PlatformPageFooterWithIconExampleComponent
} from './examples/platform-page-footer-example.component';
import { PlatformPageFooterHeaderComponent } from './platform-page-footer-header/platform-page-footer-header.component';

const routes: Routes = [
    {
        path: '',
        component: PlatformPageFooterHeaderComponent,
        children: [
            { path: '', component: PlatformPageFooterDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.footer } }
        ]
    }
];

@NgModule({
    declarations: [
        PlatformPageFooterDocsComponent,
        PlatformPageFooterHeaderComponent,
        PlatformPageFooterExampleComponent,
        PlatformPageFooterWithIconExampleComponent,
        PlatformPageFooterMultipleLineExampleComponent
    ],
    exports: [RouterModule],
    imports: [
        RouterModule.forChild(routes),
        SharedDocumentationPageModule,
        PlatformPageFooterModule,
        PlatformLinkModule,
        LinkModule
    ],
    providers: [currentComponentProvider('page-footer')]
})
export class PlatformDocPageFooterModule {}
