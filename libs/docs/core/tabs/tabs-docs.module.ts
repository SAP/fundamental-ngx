import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { FormModule } from '@fundamental-ngx/core/form';
import { InputGroupModule } from '@fundamental-ngx/core/input-group';
import { SegmentedButtonModule } from '@fundamental-ngx/core/segmented-button';
import { TabsModule } from '@fundamental-ngx/core/tabs';
import { TitleModule } from '@fundamental-ngx/core/title';
import { API_FILES } from '@fundamental-ngx/docs/core/shared';
import { ApiComponent, SharedDocumentationPageModule, currentComponentProvider } from '@fundamental-ngx/docs/shared';
import {
    TabNavigationExampleChildFirstComponent,
    TabNavigationExampleChildSecondComponent,
    TabNavigationExampleChildThirdComponent,
    examples
} from './examples';
import { TabsDocsComponent } from './tabs-docs.component';
import { TabsHeaderComponent } from './tabs-header/tabs-header.component';

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
        SegmentedButtonModule,
        examples,
        TabsHeaderComponent,
        TabsDocsComponent
    ],
    exports: [RouterModule],
    providers: [currentComponentProvider('tabs')]
})
export class TabsDocsModule {}
