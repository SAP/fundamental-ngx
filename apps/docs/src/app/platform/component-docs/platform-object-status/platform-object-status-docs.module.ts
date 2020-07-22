import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { API_FILES } from '../../api-files';
import { SharedDocumentationModule } from '../../../documentation/shared-documentation.module';
import { PlatformObjectStatusHeaderComponent } from './platform-object-status-header/platform-object-status-header.component';
import { PlatformObjectStatusDocsComponent } from './platform-object-status-docs.component';
import {
    PlatformObjectStatusExampleComponent,
    PlatformObjectStatusTextExampleComponent,
    PlatformObjectStatusGenericExampleComponent,
    PlatformObjectStatusTextIconExampleComponent,
    PlatformObjectStatusClickableAndIconExampleComponent,
    PlatformObjectStatusInvertedTextExampleComponent,
    PlatformObjectStatusInvertedGenericTextExampleComponent,
    PlatformObjectStatusLargeExampleComponent
} from './platform-object-status-example/platform-object-status-example.component';
import { PlatformObjectStatusModule } from '@fundamental-ngx/platform';

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
    imports: [RouterModule.forChild(routes), SharedDocumentationModule, PlatformObjectStatusModule],
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
