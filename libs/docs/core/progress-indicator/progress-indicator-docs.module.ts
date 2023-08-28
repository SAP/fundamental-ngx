import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProgressIndicatorModule } from '@fundamental-ngx/core/progress-indicator';
import { API_FILES } from '@fundamental-ngx/docs/core/shared';
import { ApiComponent, currentComponentProvider, SharedDocumentationPageModule } from '@fundamental-ngx/docs/shared';
import { ProgressIndicatorAnimationComponent } from './examples/progress-indicator-animation.component';
import { ProgressIndicatorDefaultComponent } from './examples/progress-indicator-default.component';
import { ProgressIndicatorStateComponent } from './examples/progress-indicator-state.component';
import { ProgressIndicatorTruncationComponent } from './examples/progress-indicator-truncation.component';
import { ProgressIndicatorDocsComponent } from './progress-indicator-docs.component';
import { ProgressIndicatorHeaderComponent } from './progress-indicator-header/progress-indicator-header.component';

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
    imports: [
        RouterModule.forChild(routes),
        SharedDocumentationPageModule,
        ProgressIndicatorModule,
        ProgressIndicatorDocsComponent,
        ProgressIndicatorHeaderComponent,
        ProgressIndicatorDefaultComponent,
        ProgressIndicatorStateComponent,
        ProgressIndicatorTruncationComponent,
        ProgressIndicatorAnimationComponent
    ],
    exports: [RouterModule],
    providers: [currentComponentProvider('progress-indicator')]
})
export class ProgressIndicatorDocsModule {}
