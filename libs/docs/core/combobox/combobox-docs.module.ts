import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ComboboxModule } from '@fundamental-ngx/core/combobox';
import { FormModule } from '@fundamental-ngx/core/form';
import { ListModule } from '@fundamental-ngx/core/list';

import { API_FILES } from '@fundamental-ngx/docs/core/shared';
import { ApiComponent, currentComponentProvider, SharedDocumentationPageModule } from '@fundamental-ngx/docs/shared';
import { ComboboxDocsComponent } from './combobox-docs.component';
import { ComboboxHeaderComponent } from './combobox-header/combobox-header.component';
import { examples } from './examples';
import { ComboboxBylineExampleComponent } from './examples/combobox-byline-example.component';

const routes: Routes = [
    {
        path: '',
        component: ComboboxHeaderComponent,
        children: [
            { path: '', component: ComboboxDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.combobox } }
        ]
    }
];

@NgModule({
    imports: [
        ListModule,
        FormModule,
        ComboboxModule,
        RouterModule.forChild(routes),
        SharedDocumentationPageModule,
        examples,
        ComboboxDocsComponent,
        ComboboxHeaderComponent,
        ComboboxBylineExampleComponent
    ],
    exports: [RouterModule],
    providers: [currentComponentProvider('combobox')]
})
export class ComboboxDocsModule {}
