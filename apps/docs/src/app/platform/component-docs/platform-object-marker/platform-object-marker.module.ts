import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlatformObjectMarkerModule } from '@fundamental-ngx/platform';
import {
    ObjectMarkerExampleComponent,
    ObjectMarkerIconAndTextClickableExampleComponent,
    ObjectMarkerTextAndIconExampleComponent,
    ObjectMarkerTextOnlyExampleComponent
} from './object-marker-example/object-marker-example.component';
import { ObjectMarkerHeaderComponent } from './object-marker-header/object-marker-header.component';

import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { PlatformObjectMarkerDocsComponent } from './platform-object-marker-docs.component';

import { SharedDocumentationPageModule } from '../../../documentation/shared-documentation-page.module';
import { API_FILES } from '../../api-files';

const routes: Routes = [
    {
        path: '',
        component: ObjectMarkerHeaderComponent,
        children: [
            { path: '', component: PlatformObjectMarkerDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.objectMarker } }
        ]
    }
];

@NgModule({
    declarations: [
        PlatformObjectMarkerDocsComponent,
        ObjectMarkerExampleComponent,
        ObjectMarkerHeaderComponent,
        ObjectMarkerTextAndIconExampleComponent,
        ObjectMarkerTextOnlyExampleComponent,
        ObjectMarkerIconAndTextClickableExampleComponent
    ],
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes), SharedDocumentationPageModule, PlatformObjectMarkerModule]
})
export class PlatformObjectMarkerDocsModule {}
