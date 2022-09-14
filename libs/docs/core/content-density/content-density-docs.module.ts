import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent, currentComponentProvider, SharedDocumentationPageModule } from '@fundamental-ngx/docs/shared';
import { API_FILES } from '@fundamental-ngx/docs/core/shared';
import { ContentDensityHeaderComponent } from './content-density-header/content-density-header.component';
import { ContentDensityDocsComponent } from './content-density-docs.component';
import { ContentDensityExampleComponent } from './examples/content-density-example.component';
import { SelectModule } from '@fundamental-ngx/core/select';
import { ContentDensityModule } from '@fundamental-ngx/core/content-density';
import { DirectiveUsageExampleComponent } from './examples/directive-usage/directive-usage-example.component';
import { ContentDensityUserComponent } from './examples/content-density-user/content-density-user.component';
import { ObjectStatusModule } from '@fundamental-ngx/core/object-status';

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
        ObjectStatusModule
    ],
    exports: [RouterModule],
    declarations: [
        ContentDensityDocsComponent,
        ContentDensityHeaderComponent,
        ContentDensityExampleComponent,
        DirectiveUsageExampleComponent,
        ContentDensityUserComponent
    ],
    providers: [currentComponentProvider('content-density')]
})
export class ContentDensityDocsModule {}
