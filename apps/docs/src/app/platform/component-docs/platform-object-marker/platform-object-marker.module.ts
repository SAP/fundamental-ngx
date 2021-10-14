import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { SharedDocumentationPageModule } from '../../../documentation/shared-documentation-page.module';
import { API_FILES } from '../../api-files';

import { PlatformObjectMarkerModule } from '@fundamental-ngx/platform/object-marker';
import { COMPONENTS } from './object-marker-example';
import { ObjectMarkerHeaderComponent } from './object-marker-header/object-marker-header.component';
import { PlatformObjectMarkerDocsComponent } from './platform-object-marker-docs.component';

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
    declarations: [PlatformObjectMarkerDocsComponent, ObjectMarkerHeaderComponent, ...COMPONENTS],
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes), SharedDocumentationPageModule, PlatformObjectMarkerModule]
})
export class PlatformObjectMarkerDocsModule {}
