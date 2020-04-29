import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { SharedDocumentationModule } from '../../../documentation/shared-documentation.module';
import { API_FILES } from '../../api-files';
import { TabsHeaderComponent } from './tabs-header/tabs-header.component';
import { TabsDocsComponent } from './tabs-docs.component';
import {
    TabNavigationExampleChildFirst,
    TabNavigationExampleChildSecond,
    TabNavigationExampleChildThird
} from './examples/tab-navigation-children/tab-navigation-children';
import { TabCounterComponent } from './examples/tab-counter/tab-counter.component';
import { TabsExampleComponent } from './examples/tabs-examples-component';
import { AddingTabExampleComponent } from './examples/adding-tab-example/adding-tab-example.component';
import { TabFilterExampleComponent } from './examples/tab-filter-example/tab-filter-example.component';
import { TabProcessExampleComponent } from './examples/tab-process-example/tab-process-example.component';
import { TabIconOnlyExampleComponent } from './examples/tab-icon-only-example/tab-icon-only-example.component';
import { TabSelectionExampleComponent } from './examples/tab-selection-example.component';
import { ComplexTitleExampleComponent } from './examples/complex-title-example/complex-title-example.component';
import { TabsNavigationModeExampleComponent } from './examples/tab-navigation-mode-example-component';
import { TabsModule } from '@fundamental-ngx/core';

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
    imports: [RouterModule.forChild(routes), SharedDocumentationModule, TabsModule],
    exports: [RouterModule],
    declarations: [
        TabsDocsComponent,
        TabsHeaderComponent,
        TabCounterComponent,
        TabsExampleComponent,
        AddingTabExampleComponent,
        TabFilterExampleComponent,
        TabProcessExampleComponent,
        TabIconOnlyExampleComponent,
        TabSelectionExampleComponent,
        ComplexTitleExampleComponent,
        TabNavigationExampleChildFirst,
        TabNavigationExampleChildThird,
        TabNavigationExampleChildSecond,
        TabsNavigationModeExampleComponent
    ]
})
export class TabsDocsModule {}
