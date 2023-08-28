import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PipeModule, TruncateModule } from '@fundamental-ngx/cdk/utils';
import { IconModule } from '@fundamental-ngx/core/icon';
import { API_FILES } from '@fundamental-ngx/docs/core/shared';
import { ApiComponent, SharedDocumentationPageModule, currentComponentProvider } from '@fundamental-ngx/docs/shared';
import { TruncateExampleComponent } from './examples/truncate-example.component';
import { TruncateTextExampleComponent } from './examples/truncate-text-example.component';
import { TruncateDocsHeaderComponent } from './truncate-docs-header/truncate-docs-header.component';
import { TruncateDocsComponent } from './truncate-docs.component';

const routes: Routes = [
    {
        path: '',
        component: TruncateDocsHeaderComponent,
        children: [
            { path: '', component: TruncateDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.truncate } }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        SharedDocumentationPageModule,
        TruncateModule,
        PipeModule,
        IconModule,
        TruncateDocsComponent,
        TruncateExampleComponent,
        TruncateTextExampleComponent,
        TruncateDocsHeaderComponent
    ],
    exports: [RouterModule],
    providers: [currentComponentProvider('truncate')]
})
export class TruncateDocsModule {}
