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
import { FacetGroupExampleComponent } from './facet-examples/facet-group-example.component';
import { FormFacetExampleComponent } from './facet-examples/form-facet-example.component';
import { FormLinkFacetExampleComponent } from './facet-examples/form-link-facet-example.component';
import { ImageFacetExampleComponent } from './facet-examples/image-facet-example.component';
import { KeyValueFacetAlignmentExampleComponent } from './facet-examples/key-value-facet-alignment-example.component';
import { KeyValueFacetExampleComponent } from './facet-examples/key-value-facet-example.component';
import { RatingIndicatorFacetExampleComponent } from './facet-examples/rating-indicator-facet-example.component';
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
