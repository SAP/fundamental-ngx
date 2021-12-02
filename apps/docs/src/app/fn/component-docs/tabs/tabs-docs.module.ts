import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { SharedDocumentationPageModule } from '../../../documentation/shared-documentation-page.module';
import { API_FILES } from '../../api-files';
import { TabsHeaderComponent } from './tabs-header/tabs-header.component';
import { TabsDocsComponent } from './tabs-docs.component';
import { examples } from './examples';
import { ExperimentalTabsModule } from '@fundamental-ngx/fn/tabs';
import { ExperimentalCheckboxModule } from '@fundamental-ngx/fn/checkbox';
import { ExperimentalRadioModule } from '@fundamental-ngx/fn/radio';
import { ExperimentalFormModule } from '@fundamental-ngx/fn/form';
import { ExperimentalSwitchModule } from '@fundamental-ngx/fn/switch';
import { ExperimentalButtonModule } from '@fundamental-ngx/fn/button';
import { ExperimentalSearchModule } from '@fundamental-ngx/fn/search';

const routes: Routes = [
    {
        path: '',
        component: TabsHeaderComponent,
        children: [
            {
                path: '',
                component: TabsDocsComponent
            },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.tabs } }
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
        ExperimentalButtonModule,
        ExperimentalSearchModule
    ],
    exports: [RouterModule],
    declarations: [examples, TabsHeaderComponent, TabsDocsComponent]
})
export class TabsDocsModule {}
