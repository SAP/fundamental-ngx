import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { API_FILES } from '../../api-files';
import { ProgressIndicatorDocsComponent } from './progress-indicator-docs.component';
import { ProgressIndicatorHeaderComponent } from './progress-indicator-header/progress-indicator-header.component';
import { SharedDocumentationPageModule } from '../../../documentation/shared-documentation-page.module';
import { ProgressIndicatorDefaultComponent } from './example/progress-indicator-default.component';
import { ProgressIndicatorModule } from '@fundamental-ngx/core/progress-indicator';
import { ProgressIndicatorStateComponent } from './example/progress-indicator-state.component';
import { ProgressIndicatorTruncationComponent } from './example/progress-indicator-truncation.component';
import { ProgressIndicatorAnimationComponent } from './example/progress-indicator-animation.component';

const routes: Routes = [
    {
        path: '',
        component: ProgressIndicatorHeaderComponent,
        children: [
            { path: '', component: ProgressIndicatorDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.progressIndicator } }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes), SharedDocumentationPageModule, ProgressIndicatorModule],
    exports: [RouterModule],
    declarations: [
        ProgressIndicatorDocsComponent,
        ProgressIndicatorHeaderComponent,
        ProgressIndicatorDefaultComponent,
        ProgressIndicatorStateComponent,
        ProgressIndicatorTruncationComponent,
        ProgressIndicatorAnimationComponent
    ]
})
export class ProgressIndicatorDocsModule {}
