import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FocusableListModule } from '@fundamental-ngx/cdk/utils';
import { API_FILES } from '@fundamental-ngx/docs/cdk/shared';
import { ApiComponent, SharedDocumentationPageModule, currentComponentProvider } from '@fundamental-ngx/docs/shared';
import { DefaultExampleComponent } from './examples/default-example/default-example.component';
import { FocusableListDocsComponent } from './focusable-list-docs.component';
import { FocusableListHeaderComponent } from './focusable-list-header/focusable-list-header.component';

const routes: Routes = [
    {
        path: '',
        component: FocusableListHeaderComponent,
        children: [
            {
                path: '',
                component: FocusableListDocsComponent
            },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.focusableList } }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        SharedDocumentationPageModule,
        FocusableListModule,
        FocusableListHeaderComponent,
        FocusableListDocsComponent,
        DefaultExampleComponent
    ],
    exports: [RouterModule],
    providers: [currentComponentProvider('focusable-list')]
})
export class FocusableListDocsModule {}
