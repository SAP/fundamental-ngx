import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListModule } from '@fundamental-ngx/core/list';
import { FormModule } from '@fundamental-ngx/core/form';
import { ComboboxModule, DeprecatedComboboxContentDensityDirective } from '@fundamental-ngx/core/combobox';

import { ApiComponent, currentComponentProvider, SharedDocumentationPageModule } from '@fundamental-ngx/docs/shared';
import { API_FILES } from '@fundamental-ngx/docs/core/shared';
import { ComboboxHeaderComponent } from './combobox-header/combobox-header.component';
import { ComboboxDocsComponent } from './combobox-docs.component';
import { examples } from './examples';
import { ComboboxBylineExampleComponent } from './examples/combobox-byline-example.component';
import { moduleDeprecationsProvider } from '@fundamental-ngx/core/utils';

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
    imports: [ListModule, FormModule, ComboboxModule, RouterModule.forChild(routes), SharedDocumentationPageModule],
    exports: [RouterModule],
    declarations: [examples, ComboboxDocsComponent, ComboboxHeaderComponent, ComboboxBylineExampleComponent],
    providers: [
        moduleDeprecationsProvider(DeprecatedComboboxContentDensityDirective),
        currentComponentProvider('combobox')
    ]
})
export class ComboboxDocsModule {}
