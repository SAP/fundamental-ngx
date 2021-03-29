import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
    AvatarModule,
    ObjectNumberModule,
    ObjectStatusModule,
    RatingIndicatorModule,
    FacetModule,
    IconModule,
    LinkModule,
    TextModule
} from '@fundamental-ngx/core';

import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { SharedDocumentationPageModule } from '../../../documentation/shared-documentation-page.module';
import { API_FILES } from '../../api-files';
import { FacetDocsComponent } from './facet-docs.component';
import { CustomFacetExampleComponent } from './facet-examples/custom-facet-example.component';
import {
    FacetGroupExampleComponent,
    FormFacetExampleComponent,
    FormLinkFacetExampleComponent,
    ImageFacetExampleComponent,
    KeyValueFacetAlignmentExampleComponent,
    KeyValueFacetExampleComponent,
    RatingIndicatorFacetExampleComponent
} from './facet-examples/facet-examples.component';
import { FacetDocsHeaderComponent } from './facet-header/facet-docs-header.component';

const routes: Routes = [
    {
        path: '',
        component: FacetDocsHeaderComponent,
        children: [
            { path: '', component: FacetDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.facets } }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        SharedDocumentationPageModule,
        RatingIndicatorModule,
        ObjectStatusModule,
        ObjectNumberModule,
        AvatarModule,
        FacetModule,
        IconModule,
        LinkModule,
        TextModule
    ],
    exports: [RouterModule],
    declarations: [
        FacetDocsComponent,
        FacetDocsHeaderComponent,
        FacetGroupExampleComponent,
        FormFacetExampleComponent,
        FormLinkFacetExampleComponent,
        KeyValueFacetExampleComponent,
        KeyValueFacetAlignmentExampleComponent,
        ImageFacetExampleComponent,
        RatingIndicatorFacetExampleComponent,
        CustomFacetExampleComponent
    ]
})
export class FacetDocsModule {}
