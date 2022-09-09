import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent, currentComponentProvider, SharedDocumentationPageModule } from '@fundamental-ngx/docs/shared';
import { API_FILES } from '@fundamental-ngx/docs/fn/shared';
import { SelectHeaderComponent } from './select-header/select-header.component';
import { SelectDocsComponent } from './select-docs.component';
import { examples } from './examples';
import { SelectModule } from '@fundamental-ngx/fn/select';
import { FormModule } from '@fundamental-ngx/core/form';

const routes: Routes = [
    {
        path: '',
        component: SelectHeaderComponent,
        children: [
            {
                path: '',
                component: SelectDocsComponent
            },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.select } }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes), SharedDocumentationPageModule, SelectModule, FormModule],
    exports: [RouterModule],
    declarations: [examples, SelectHeaderComponent, SelectDocsComponent],
    providers: [currentComponentProvider('select')]
})
export class SelectDocsModule {}
