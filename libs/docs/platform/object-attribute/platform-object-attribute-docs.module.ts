import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ApiComponent, currentComponentProvider, SharedDocumentationPageModule } from '@fundamental-ngx/docs/shared';
import { API_FILES } from '@fundamental-ngx/docs/platform/shared';

import { PlatformLinkModule } from '@fundamental-ngx/platform/link';
import { PlatformObjectAttributeModule } from '@fundamental-ngx/platform/object-attribute';
import { PlatformObjectAttributeHeaderComponent } from './platform-object-attribute-header/platform-object-attribute-header.component';
import { PlatformObjectAttributeDocsComponent } from './platform-object-attribute-docs.component';
import {
    PlatformObjectAttributeExampleComponent,
    PlatformObjectAttributeTruncateExampleComponent
} from './examples/platform-object-attribute-examples.component';
import { PlatformObjectAttributeLinkExampleComponent } from './examples/platform-object-attribute-link-example.component';

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
    ],
    providers: [currentComponentProvider('object-attribute')]
})
export class PlatformObjectAttributeDocsModule {}
