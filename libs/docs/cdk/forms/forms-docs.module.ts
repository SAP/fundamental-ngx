import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent, currentComponentProvider, SharedDocumentationPageModule } from '@fundamental-ngx/docs/shared';
import { API_FILES } from '@fundamental-ngx/docs/cdk/shared';
import { CustomCdkControlExampleComponent } from './examples/default/forms-default-example.component';
import { FormsHeaderComponent } from './forms-header/forms-header.component';
import { FormsDocsComponent } from './forms-docs.component';
import { examples } from './examples';
import { FormsModule } from '@fundamental-ngx/cdk/forms';
import { FdpFormGroupModule } from '@fundamental-ngx/platform/form';
import { CheckboxModule } from '@fundamental-ngx/core/checkbox';
import { MultiComboboxModule } from '@fundamental-ngx/core/multi-combobox';

const routes: Routes = [
    {
        path: '',
        component: FormsHeaderComponent,
        children: [
            { path: '', component: FormsDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.forms } }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        SharedDocumentationPageModule,
        FormsModule,
        FdpFormGroupModule,
        ReactiveFormsModule,
        CheckboxModule,
        MultiComboboxModule
    ],
    exports: [RouterModule],
    declarations: [examples, FormsDocsComponent, FormsHeaderComponent, CustomCdkControlExampleComponent],
    providers: [currentComponentProvider('forms')]
})
export class FormsDocsModule {}
