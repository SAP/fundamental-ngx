import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ObjectMarkerModule } from '@fundamental-ngx/core/object-marker';
import { API_FILES } from '@fundamental-ngx/docs/core/shared';
import { ApiComponent, SharedDocumentationPageModule, currentComponentProvider } from '@fundamental-ngx/docs/shared';
import { ObjectMarkerClickableExampleComponent } from './examples/object-marker-clickable-example.component';
import {
    ObjectMarkerExampleComponent,
    ObjectMarkerIconAndTextExampleComponent,
    ObjectMarkerTextExampleComponent
} from './examples/object-marker-example.component';
import { ObjectMarkerDocsComponent } from './object-marker-docs.component';
import { ObjectMarkerHeaderComponent } from './object-marker-header/object-marker-header.component';

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
    imports: [
        RouterModule.forChild(routes),
        ObjectMarkerModule,
        SharedDocumentationPageModule,
        ObjectMarkerDocsComponent,
        ObjectMarkerHeaderComponent,
        ObjectMarkerExampleComponent,
        ObjectMarkerIconAndTextExampleComponent,
        ObjectMarkerClickableExampleComponent,
        ObjectMarkerTextExampleComponent
    ],
    exports: [RouterModule],
    providers: [currentComponentProvider('object-marker')]
})
export class ObjectMarkerDocsModule {}
