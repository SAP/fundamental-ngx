import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { API_FILES } from '../../api-files';
import { SharedDocumentationModule } from '../../../documentation/shared-documentation.module';

import { PlatformLinkHeaderComponent } from './platform-link-header/platform-link-header.component';
import { PlatformLinkDocsComponent } from './platform-link-docs.component';
import { PlatformLinkDisabledEmphasizedExampleComponent } from './platform-link-examples/platform-link-examples.component';
import { PlatformLinkDisabledExampleComponent } from './platform-link-examples/platform-link-examples.component';
import { PlatformLinkEmphasizedExampleComponent } from './platform-link-examples/platform-link-examples.component';
import { PlatformLinkIconExampleComponent } from './platform-link-examples/platform-link-examples.component';
import { PlatformLinkInvertedExampleComponent } from './platform-link-examples/platform-link-examples.component';
import { PlatformLinkStandardExampleComponent } from './platform-link-examples/platform-link-examples.component';
import { PlatformLinkTruncatedExampleComponent } from './platform-link-examples/platform-link-examples.component';
import { PlatformLinkModule } from '@fundamental-ngx/platform';

const routes: Routes = [
    {
        path: '',
        component: PlatformLinkHeaderComponent,
        children: [
            { path: '', component: PlatformLinkDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.link } }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes), SharedDocumentationModule, PlatformLinkModule],
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
    ]
})
export class PlatformLinkDocsModule {}
