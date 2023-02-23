import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { BusyIndicatorModule } from '@fundamental-ngx/core/busy-indicator';
import { ApiComponent, currentComponentProvider, SharedDocumentationPageModule } from '@fundamental-ngx/docs/shared';
import { API_FILES } from '@fundamental-ngx/docs/core/shared';
import { MultiComboboxHeaderComponent } from './multi-combobox-header/multi-combobox-header.component';
import { MultiComboboxDocsComponent } from './multi-combobox-docs.component';
import { MultiComboboxModule } from '@fundamental-ngx/core/multi-combobox';
import { MultiComboboxDatasourceExampleComponent } from './examples/multi-combobox-datasource/multi-combobox-datasource-example.component';
import { MultiComboboxMobileExampleComponent } from './examples/multi-combobox-mobile/multi-combobox-mobile-example.component';
import { MultiComboboxGroupExampleComponent } from './examples/multi-combobox-group/multi-combobox-group-example.component';
import { MultiComboboxColumnsExampleComponent } from './examples/multi-combobox-columns/multi-combobox-columns-example.component';
import { MultiComboboxFormsExampleComponent } from './examples/multi-combobox-forms/multi-combobox-forms-example.component';
import { MultiComboboxStatesExampleComponent } from './examples/multi-combobox-states/multi-combobox-states-example.component';
import { MultiComboboxLoadingExampleComponent } from './examples/multi-combobox-loading/multi-combobox-loading-example.component';
import { FormModule } from '@fundamental-ngx/core/form';

const routes: Routes = [
    {
        path: '',
        component: MultiComboboxHeaderComponent,
        children: [
            { path: '', component: MultiComboboxDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.multiCombobox } }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        SharedDocumentationPageModule,
        MultiComboboxModule,
        FormsModule,
        ReactiveFormsModule,
        BusyIndicatorModule,
        FormModule
    ],
    exports: [RouterModule],
    declarations: [
        MultiComboboxDocsComponent,
        MultiComboboxHeaderComponent,
        MultiComboboxDatasourceExampleComponent,
        MultiComboboxMobileExampleComponent,
        MultiComboboxGroupExampleComponent,
        MultiComboboxColumnsExampleComponent,
        MultiComboboxFormsExampleComponent,
        MultiComboboxStatesExampleComponent,
        MultiComboboxLoadingExampleComponent
    ],
    providers: [currentComponentProvider('multi-combobox')]
})
export class MultiComboboxDocsModule {}
