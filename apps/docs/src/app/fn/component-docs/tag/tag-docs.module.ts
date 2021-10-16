import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { SharedDocumentationPageModule } from '../../../documentation/shared-documentation-page.module';
import { API_FILES } from '../../api-files';
import { TagHeaderComponent } from './tag-header/tag-header.component';
import { TagDocsComponent } from './tag-docs.component';
import { examples } from './examples';
import { ExperimentalTagModule } from '@fundamental-ngx/fn/tag';
import { ExperimentalCheckboxModule } from '@fundamental-ngx/fn/checkbox';
import { ExperimentalRadioModule } from '@fundamental-ngx/fn/radio';
import { ExperimentalFormModule } from '@fundamental-ngx/fn/form';
import { ExperimentalSwitchModule } from '@fundamental-ngx/fn/switch';
import { ExperimentalButtonModule } from '@fundamental-ngx/fn/button';
import { ExperimentalSearchModule } from '@fundamental-ngx/fn/search';

const routes: Routes = [
    {
        path: '',
        component: TagHeaderComponent,
        children: [
            {
                path: '',
                component: TagDocsComponent
            },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.tabs } }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        SharedDocumentationPageModule,
        ExperimentalTagModule,
        ExperimentalCheckboxModule,
        ExperimentalRadioModule,
        ExperimentalFormModule,
        ExperimentalSwitchModule,
        ExperimentalButtonModule,
        ExperimentalSearchModule
    ],
    exports: [RouterModule],
    declarations: [examples, TagHeaderComponent, TagDocsComponent]
})
export class TagDocsModule {}
