import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { SharedDocumentationPageModule } from '../../../documentation/shared-documentation-page.module';
import { API_FILES } from '../../api-files';
import { TabsHeaderComponent } from './tabs-header/tabs-header.component';
import { TabsDocsComponent } from './tabs-docs.component';
import {
    examples,
    TabNavigationExampleChildFirst,
    TabNavigationExampleChildSecond,
    TabNavigationExampleChildThird
} from './examples';
import { TabsModule } from '@fundamental-ngx/core/tabs';
import { TitleModule } from '@fundamental-ngx/core/title';
import { SegmentedButtonModule } from '@fundamental-ngx/core/segmented-button';

const routes: Routes = [
    {
        path: '',
        component: TabsHeaderComponent,
        children: [
            {
                path: '',
                component: TabsDocsComponent,
                children: [
                    { path: 'tab1', component: TabNavigationExampleChildFirst },
                    { path: 'tab2', component: TabNavigationExampleChildSecond },
                    { path: 'tab3', component: TabNavigationExampleChildThird }
                ]
            },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.tabs } }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes), SharedDocumentationPageModule, TabsModule, TitleModule, SegmentedButtonModule],
    exports: [RouterModule],
    declarations: [examples, TabsHeaderComponent, TabsDocsComponent]
})
export class TabsDocsModule { }
