import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { SharedDocumentationPageModule } from '../../../documentation/shared-documentation-page.module';
import { API_FILES } from '../../api-files';
import { ProgressBarHeaderComponent } from './progress-bar-header/progress-bar-header.component';
import { ProgressBarDocsComponent } from './progress-bar-docs.component';
import { examples } from './examples';
import { ProgressBarModule } from '@fundamental-ngx/fn/progress-bar';

const routes: Routes = [
    {
        path: '',
        component: ProgressBarHeaderComponent,
        children: [
            { path: '', component: ProgressBarDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.progressBar } }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes), SharedDocumentationPageModule, ProgressBarModule],
    exports: [RouterModule],
    declarations: [examples, ProgressBarDocsComponent, ProgressBarHeaderComponent]
})
export class ProgressBarDocsModule {}
