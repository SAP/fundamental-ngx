import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataSourceModule } from '@fundamental-ngx/cdk/data-source';
import { SelectModule } from '@fundamental-ngx/core/select';
import { API_FILES } from '@fundamental-ngx/docs/cdk/shared';
import { ApiComponent, SharedDocumentationPageModule, currentComponentProvider } from '@fundamental-ngx/docs/shared';
import { DataSourceDocsComponent } from './data-source-docs.component';
import { DataSourceHeaderComponent } from './data-source-header/data-source-header.component';
import { examples } from './examples';

const routes: Routes = [
    {
        path: '',
        component: DataSourceHeaderComponent,
        children: [
            { path: '', component: DataSourceDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.dataSource } }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        SharedDocumentationPageModule,
        DataSourceModule,
        SelectModule,
        examples,
        DataSourceDocsComponent,
        DataSourceHeaderComponent
    ],
    exports: [RouterModule],
    providers: [currentComponentProvider('data-source')]
})
export class DataSourceDocsModule {}
