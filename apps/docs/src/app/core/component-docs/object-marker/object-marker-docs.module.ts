import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ObjectMarkerModule } from '@fundamental-ngx/core';
import { ObjectMarkerDocsComponent } from './object-marker-docs.component';
import { ObjectMarkerHeaderComponent } from './object-marker-header/object-marker-header.component';
import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { API_FILES } from '../../api-files';
import {
    ObjectMarkerExampleComponent,
    ObjectMarkerIconAndTextExampleComponent,
    ObjectMarkerClickableExampleComponent,
    ObjectMarkerTextExampleComponent
} from './examples/object-marker-example.component';
import { SharedDocumentationPageModule } from '../../../documentation/shared-documentation-page.module';

const routes: Routes = [
    {
        path: '',
        component: ObjectMarkerHeaderComponent,
        children: [
            { path: '', component: ObjectMarkerDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.objectMarker } }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes), ObjectMarkerModule, SharedDocumentationPageModule],
    exports: [RouterModule],
    declarations: [
        ObjectMarkerDocsComponent,
        ObjectMarkerHeaderComponent,
        ObjectMarkerExampleComponent,
        ObjectMarkerIconAndTextExampleComponent,
        ObjectMarkerClickableExampleComponent,
        ObjectMarkerTextExampleComponent
    ]
})
export class ObjectMarkerDocsModule {}
