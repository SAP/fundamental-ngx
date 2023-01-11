import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListModule } from '@fundamental-ngx/fn/list';
import { ButtonModule } from '@fundamental-ngx/fn/button';
import { CheckboxModule } from '@fundamental-ngx/fn/checkbox';
import { ApiComponent, currentComponentProvider, SharedDocumentationPageModule } from '@fundamental-ngx/docs/shared';
import { API_FILES } from '@fundamental-ngx/docs/fn/shared';
import { ListHeaderComponent } from './list-header/list-header.component';
import { ListDocsComponent } from './list-docs.component';
import { examples } from './examples';
import { SelectableListModule } from '@fundamental-ngx/cdk/utils';

const routes: Routes = [
    {
        path: '',
        component: ListHeaderComponent,
        children: [
            { path: '', component: ListDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.list } }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        SharedDocumentationPageModule,
        ListModule,
        SelectableListModule,
        ButtonModule,
        CheckboxModule
    ],
    exports: [RouterModule],
    declarations: [examples, ListDocsComponent, ListHeaderComponent],
    providers: [currentComponentProvider('list')]
})
export class ListDocsModule {}
