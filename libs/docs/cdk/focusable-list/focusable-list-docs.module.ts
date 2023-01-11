import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent, currentComponentProvider, SharedDocumentationPageModule } from '@fundamental-ngx/docs/shared';
import { API_FILES } from '@fundamental-ngx/docs/fn/shared';
import { FocusableListDocsComponent } from './focusable-list-docs.component';
import { FocusableListHeaderComponent } from './focusable-list-header/focusable-list-header.component';
import { DefaultExampleComponent } from './examples/default-example/default-example.component';
import { FocusableListModule } from '@fundamental-ngx/cdk/utils';

const routes: Routes = [
    {
        path: '',
        component: FocusableListHeaderComponent,
        children: [
            {
                path: '',
                component: FocusableListDocsComponent
            },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.tabs } }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes), SharedDocumentationPageModule, FocusableListModule],
    exports: [RouterModule],
    declarations: [FocusableListHeaderComponent, FocusableListDocsComponent, DefaultExampleComponent],
    providers: [currentComponentProvider('focusable-list')]
})
export class FocusableListDocsModule {}
