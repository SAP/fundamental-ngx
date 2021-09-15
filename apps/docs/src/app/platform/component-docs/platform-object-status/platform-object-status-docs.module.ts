import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { API_FILES } from '../../api-files';
import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { SharedDocumentationPageModule } from '../../../documentation/shared-documentation-page.module';

import { PlatformObjectStatusModule } from '@fundamental-ngx/platform/object-status';
import { PlatformObjectStatusHeaderComponent } from './platform-object-status-header/platform-object-status-header.component';
import { PlatformObjectStatusDocsComponent } from './platform-object-status-docs.component';
import {
    PlatformObjectStatusExampleComponent,
    PlatformObjectStatusTextExampleComponent,
    PlatformObjectStatusGenericExampleComponent,
    PlatformObjectStatusTextIconExampleComponent,
    PlatformObjectStatusInvertedTextExampleComponent,
    PlatformObjectStatusInvertedGenericTextExampleComponent
} from './platform-object-status-example/platform-object-status-example.component';
import { PlatformObjectStatusClickableAndIconExampleComponent, } from './platform-object-status-example/platform-object-status-clickable-and-icon-example.component';
import { PlatformObjectStatusLargeExampleComponent, } from './platform-object-status-example/platform-object-status-large-example.component';

const routes: Routes = [
    {
        path: '',
        component: PlatformObjectStatusHeaderComponent,
        children: [
            { path: '', component: PlatformObjectStatusDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.objectStatus } }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes), SharedDocumentationPageModule, PlatformObjectStatusModule],
    exports: [RouterModule],
    declarations: [
        PlatformObjectStatusDocsComponent,
        PlatformObjectStatusExampleComponent,
        PlatformObjectStatusTextExampleComponent,
        PlatformObjectStatusGenericExampleComponent,
        PlatformObjectStatusTextIconExampleComponent,
        PlatformObjectStatusClickableAndIconExampleComponent,
        PlatformObjectStatusInvertedTextExampleComponent,
        PlatformObjectStatusInvertedGenericTextExampleComponent,
        PlatformObjectStatusLargeExampleComponent,
        PlatformObjectStatusHeaderComponent
    ]
})
export class PlatformObjectStatusDocsModule {}
