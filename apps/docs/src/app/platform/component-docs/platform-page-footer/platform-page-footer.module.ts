import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { API_FILES } from '../../api-files';
import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { SharedDocumentationPageModule } from '../../../documentation/shared-documentation-page.module';

import { LinkModule } from '@fundamental-ngx/core/link';
import { PlatformLinkModule } from '@fundamental-ngx/platform/link';
import { PlatformPageFooterModule } from '@fundamental-ngx/platform/page-footer';
import { PlatformPageFooterDocsComponent } from './platform-page-footer-docs.component';
import {
    PlatformPageFooterExampleComponent,
    PlatformPageFooterMultipleLineExampleComponent,
    PlatformPageFooterWithIconExampleComponent
} from './platform-page-footer-example/platform-page-footer-example.component';
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
    ]
})
export class PlatformDocPageFooterModule {}
