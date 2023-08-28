import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentDensityModule } from '@fundamental-ngx/core/content-density';
import { ObjectStatusModule } from '@fundamental-ngx/core/object-status';
import { SelectModule } from '@fundamental-ngx/core/select';
import { API_FILES } from '@fundamental-ngx/docs/core/shared';
import { ApiComponent, SharedDocumentationPageModule, currentComponentProvider } from '@fundamental-ngx/docs/shared';
import { ContentDensityDocsComponent } from './content-density-docs.component';
import { ContentDensityHeaderComponent } from './content-density-header/content-density-header.component';
import { ContentDensityExampleComponent } from './examples/content-density-example.component';
import { ContentDensityUserComponent } from './examples/content-density-user/content-density-user.component';
import { DirectiveUsageExampleComponent } from './examples/directive-usage/directive-usage-example.component';

const routes: Routes = [
    {
        path: '',
        component: ContentDensityHeaderComponent,
        children: [
            { path: '', component: ContentDensityDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.contentDensity } }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        SharedDocumentationPageModule,
        SelectModule,
        ContentDensityModule,
        ObjectStatusModule,
        ContentDensityDocsComponent,
        ContentDensityHeaderComponent,
        ContentDensityExampleComponent,
        DirectiveUsageExampleComponent,
        ContentDensityUserComponent
    ],
    exports: [RouterModule],
    providers: [currentComponentProvider('content-density')]
})
export class ContentDensityDocsModule {}
