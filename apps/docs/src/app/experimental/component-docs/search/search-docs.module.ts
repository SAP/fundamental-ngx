import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { SharedDocumentationPageModule } from '../../../documentation/shared-documentation-page.module';
import { API_FILES } from '../../api-files';
import { SearchHeaderComponent } from './search-header/search-header.component';
import { SearchDocsComponent } from './search-docs.component';
import { examples } from './examples';
import { ExperimentalTabsModule } from '@fundamental-ngx/experimental/tabs';
import { ExperimentalCheckboxModule } from '@fundamental-ngx/experimental/checkbox';
import { ExperimentalRadioModule } from '@fundamental-ngx/experimental/radio';
import { ExperimentalFormModule } from '@fundamental-ngx/experimental/form';
import { ExperimentalSwitchModule } from '@fundamental-ngx/experimental/switch';
import { ExperimentalSearchModule } from '@fundamental-ngx/experimental/search'

const routes: Routes = [
    {
        path: '',
        component: SearchHeaderComponent,
        children: [
            {
                path: '',
                component: SearchDocsComponent
            },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.search } }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        SharedDocumentationPageModule,
        ExperimentalTabsModule,
        ExperimentalCheckboxModule,
        ExperimentalRadioModule,
        ExperimentalFormModule,
        ExperimentalSwitchModule,
        ExperimentalSearchModule
    ],
    exports: [RouterModule],
    declarations: [examples, SearchHeaderComponent, SearchDocsComponent]
})
export class SearchDocsModule {}
