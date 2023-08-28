import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AvatarModule } from '@fundamental-ngx/core/avatar';
import { FacetModule } from '@fundamental-ngx/core/facets';
import { IconModule } from '@fundamental-ngx/core/icon';
import { LinkModule } from '@fundamental-ngx/core/link';
import { ObjectNumberModule } from '@fundamental-ngx/core/object-number';
import { ObjectStatusModule } from '@fundamental-ngx/core/object-status';
import { RatingIndicatorModule } from '@fundamental-ngx/core/rating-indicator';
import { TextModule } from '@fundamental-ngx/core/text';

import { SkeletonModule } from '@fundamental-ngx/core/skeleton';
import { API_FILES } from '@fundamental-ngx/docs/core/shared';
import { ApiComponent, currentComponentProvider, SharedDocumentationPageModule } from '@fundamental-ngx/docs/shared';
import { CustomFacetExampleComponent } from './examples/custom-facet-example.component';
import {
    FacetGroupExampleComponent,
    FacetLoadingExampleComponent,
    FormFacetExampleComponent,
    FormLinkFacetExampleComponent,
    ImageFacetExampleComponent,
    KeyValueFacetAlignmentExampleComponent,
    KeyValueFacetExampleComponent,
    RatingIndicatorFacetExampleComponent
} from './examples/facet-examples.component';
import { FacetDocsHeaderComponent } from './facet-header/facet-docs-header.component';
import { FacetsDocsComponent } from './facets-docs.component';

const routes: Routes = [
    {
        path: '',
        component: FacetDocsHeaderComponent,
        children: [
            { path: '', component: FacetsDocsComponent },
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
        TextModule,
        SkeletonModule,
        FacetsDocsComponent,
        FacetDocsHeaderComponent,
        FacetGroupExampleComponent,
        FormFacetExampleComponent,
        FormLinkFacetExampleComponent,
        KeyValueFacetExampleComponent,
        KeyValueFacetAlignmentExampleComponent,
        ImageFacetExampleComponent,
        RatingIndicatorFacetExampleComponent,
        CustomFacetExampleComponent,
        FacetLoadingExampleComponent
    ],
    exports: [RouterModule],
    providers: [currentComponentProvider('facets')]
})
export class FacetDocsModule {}
