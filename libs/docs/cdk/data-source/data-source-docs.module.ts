import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent, currentComponentProvider, SharedDocumentationPageModule } from '@fundamental-ngx/docs/shared';
import { API_FILES } from '@fundamental-ngx/docs/cdk/shared';
import { DataSourceHeaderComponent } from './data-source-header/data-source-header.component';
import { DataSourceDocsComponent } from './data-source-docs.component';
import { examples } from './examples';
import { DataSourceModule } from '@fundamental-ngx/cdk/data-source';
import { SelectModule } from '@fundamental-ngx/core/select';

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
    imports: [RouterModule.forChild(routes), SharedDocumentationPageModule, DataSourceModule, SelectModule],
    exports: [RouterModule],
    declarations: [examples, DataSourceDocsComponent, DataSourceHeaderComponent],
    providers: [currentComponentProvider('data-source')]
})
export class DataSourceDocsModule {}
