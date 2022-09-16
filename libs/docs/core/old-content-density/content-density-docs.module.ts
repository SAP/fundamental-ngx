import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent, currentComponentProvider, SharedDocumentationPageModule } from '@fundamental-ngx/docs/shared';
import { API_FILES } from '@fundamental-ngx/docs/core/shared';
import { ContentDensityHeaderComponent } from './content-density-header/content-density-header.component';
import { OldContentDensityDocsComponent } from './old-content-density-docs.component';
import { ContentDensityExampleComponent } from './examples/content-density-example.component';
import { SelectModule } from '@fundamental-ngx/core/select';

const routes: Routes = [
    {
        path: '',
        component: ContentDensityHeaderComponent,
        children: [
            { path: '', component: OldContentDensityDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.oldContentDensity } }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes), SharedDocumentationPageModule, SelectModule],
    exports: [RouterModule],
    declarations: [OldContentDensityDocsComponent, ContentDensityHeaderComponent, ContentDensityExampleComponent],
    providers: [currentComponentProvider('old-content-density')]
})
export class ContentDensityDocsModule {}
