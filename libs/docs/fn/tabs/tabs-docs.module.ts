import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent, currentComponentProvider, SharedDocumentationPageModule } from '@fundamental-ngx/docs/shared';
import { API_FILES } from '@fundamental-ngx/docs/fn/shared';
import { TabsHeaderComponent } from './tabs-header/tabs-header.component';
import { TabsDocsComponent } from './tabs-docs.component';
import { examples } from './examples';
import { TabsModule } from '@fundamental-ngx/fn/tabs';
import { CheckboxModule } from '@fundamental-ngx/fn/checkbox';
import { RadioButtonModule } from '@fundamental-ngx/fn/radio';
import { FormModule } from '@fundamental-ngx/fn/form';
import { SwitchModule } from '@fundamental-ngx/fn/switch';
import { ButtonModule } from '@fundamental-ngx/fn/button';
import { SearchModule } from '@fundamental-ngx/fn/search';

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
        TabsModule,
        CheckboxModule,
        RadioButtonModule,
        FormModule,
        SwitchModule,
        ButtonModule,
        SearchModule
    ],
    exports: [RouterModule],
    declarations: [examples, TabsHeaderComponent, TabsDocsComponent],
    providers: [currentComponentProvider('tabs')]
})
export class TabsDocsModule {}
