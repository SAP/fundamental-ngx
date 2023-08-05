import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent, currentComponentProvider, SharedDocumentationPageModule } from '@fundamental-ngx/docs/shared';
import { API_FILES } from '@fundamental-ngx/docs/core/shared';
import { TabsHeaderComponent } from './tabs-header/tabs-header.component';
import { TabsDocsComponent } from './tabs-docs.component';
import {
    examples,
    TabNavigationExampleChildFirstComponent,
    TabNavigationExampleChildSecondComponent,
    TabNavigationExampleChildThirdComponent
} from './examples';
import {  TabsModule } from '@fundamental-ngx/core/tabs';
import { TitleModule } from '@fundamental-ngx/core/title';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { FormModule } from '@fundamental-ngx/core/form';
import { InputGroupModule } from '@fundamental-ngx/core/input-group';
import { SegmentedButtonModule } from '@fundamental-ngx/core/segmented-button';
import { moduleDeprecationsProvider } from '@fundamental-ngx/cdk/utils';

const routes: Routes = [
    {
        path: '',
        component: TabsHeaderComponent,
        children: [
            {
                path: '',
                component: TabsDocsComponent,
                children: [
                    { path: 'tab1', component: TabNavigationExampleChildFirstComponent },
                    { path: 'tab2', component: TabNavigationExampleChildSecondComponent },
                    { path: 'tab3', component: TabNavigationExampleChildThirdComponent }
                ]
            },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.tabs } }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        SharedDocumentationPageModule,
        TabsModule,
        TitleModule,
        ButtonModule,
        FormModule,
        InputGroupModule,
        SegmentedButtonModule
    ],
    exports: [RouterModule],
    declarations: [examples, TabsHeaderComponent, TabsDocsComponent],
    providers: [ currentComponentProvider('tabs')]
})
export class TabsDocsModule {}
