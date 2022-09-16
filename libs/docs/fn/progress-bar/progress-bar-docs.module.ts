import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent, currentComponentProvider, SharedDocumentationPageModule } from '@fundamental-ngx/docs/shared';
import { API_FILES } from '@fundamental-ngx/docs/fn/shared';
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
    declarations: [examples, ProgressBarDocsComponent, ProgressBarHeaderComponent],
    providers: [currentComponentProvider('progress-bar')]
})
export class ProgressBarDocsModule {}
