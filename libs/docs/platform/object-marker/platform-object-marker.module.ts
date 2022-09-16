import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ApiComponent, currentComponentProvider, SharedDocumentationPageModule } from '@fundamental-ngx/docs/shared';
import { API_FILES } from '@fundamental-ngx/docs/platform/shared';

import { PlatformObjectMarkerModule } from '@fundamental-ngx/platform/object-marker';
import { COMPONENTS } from './examples';
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
    imports: [RouterModule.forChild(routes), SharedDocumentationPageModule, PlatformObjectMarkerModule],
    providers: [currentComponentProvider('object-marker')]
})
export class PlatformObjectMarkerDocsModule {}
