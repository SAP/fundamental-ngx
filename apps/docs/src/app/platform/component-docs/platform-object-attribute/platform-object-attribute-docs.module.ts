import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { SharedDocumentationPageModule } from '../../../documentation/shared-documentation-page.module';
import { API_FILES } from '../../api-files';

import { PlatformLinkModule } from '@fundamental-ngx/platform/link';
import { PlatformObjectAttributeModule } from '@fundamental-ngx/platform/object-attribute';
import { PlatformObjectAttributeHeaderComponent } from './platform-object-attribute-header/platform-object-attribute-header.component';
import { PlatformObjectAttributeDocsComponent } from './platform-object-attribute-docs.component';
import {
    PlatformObjectAttributeExampleComponent,
    PlatformObjectAttributeTruncateExampleComponent
} from './platform-object-attribute-examples/platform-object-attribute-examples.component';
import { PlatformObjectAttributeLinkExampleComponent } from './platform-object-attribute-examples/platform-object-attribute-link-example.component';

const routes: Routes = [
    {
        path: '',
        component: PlatformObjectAttributeHeaderComponent,
        children: [
            { path: '', component: PlatformObjectAttributeDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.objectAttribute } }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        SharedDocumentationPageModule,
        PlatformObjectAttributeModule,
        PlatformLinkModule
    ],
    exports: [RouterModule],
    declarations: [
        PlatformObjectAttributeDocsComponent,
        PlatformObjectAttributeHeaderComponent,
        PlatformObjectAttributeExampleComponent,
        PlatformObjectAttributeTruncateExampleComponent,
        PlatformObjectAttributeLinkExampleComponent
    ]
})
export class PlatformObjectAttributeDocsModule { }
