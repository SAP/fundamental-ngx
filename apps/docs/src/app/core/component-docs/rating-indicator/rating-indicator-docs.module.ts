import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { SharedDocumentationPageModule } from '../../../documentation/shared-documentation-page.module';
import { API_FILES } from '../../api-files';
import { RatingIndicatorDocsHeaderComponent } from './rating-indicator-docs-header/rating-indicator-docs-header.component';
import { RatingIndicatorDocsComponent } from './rating-indicator-docs.component';

import { examples } from './examples';
import { RatingIndicatorModule } from '@fundamental-ngx/core/rating-indicator';

const routes: Routes = [
    {
        path: '',
        component: RatingIndicatorDocsHeaderComponent,
        children: [
            { path: '', component: RatingIndicatorDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.ratingIndicator } }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes), SharedDocumentationPageModule, RatingIndicatorModule],
    exports: [RouterModule],
    declarations: [RatingIndicatorDocsComponent, RatingIndicatorDocsHeaderComponent, ...examples]
})
export class RatingIndicatorDocsModule { }
