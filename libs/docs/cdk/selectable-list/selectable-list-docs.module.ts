import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent, currentComponentProvider, SharedDocumentationPageModule } from '@fundamental-ngx/docs/shared';
import { API_FILES } from '@fundamental-ngx/docs/cdk/shared';
import { SelectableListDocsComponent } from './selectable-list-docs.component';
import { SelectableListHeaderComponent } from './selectable-list-header/selectable-list-header.component';
import { DefaultExampleComponent } from './examples/default-example/default-example.component';
import { SelectableListModule } from '@fundamental-ngx/cdk/utils';
import { AdvancedUsageComponent } from './examples/advanced-usage/advanced-usage.component';
import { CustomSelectableItemDirective } from './examples/advanced-usage/custom-selectable-item.directive';

const routes: Routes = [
    {
        path: '',
        component: SelectableListHeaderComponent,
        children: [
            {
                path: '',
                component: SelectableListDocsComponent
            },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.selectableList } }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes), SharedDocumentationPageModule, SelectableListModule],
    exports: [RouterModule],
    declarations: [
        SelectableListHeaderComponent,
        SelectableListDocsComponent,
        DefaultExampleComponent,
        CustomSelectableItemDirective,
        AdvancedUsageComponent
    ],
    providers: [currentComponentProvider('selectable-list')]
})
export class SelectableListDocsModule {}
