import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@fundamental-ngx/cdk/forms';
import { CheckboxModule } from '@fundamental-ngx/core/checkbox';
import { MultiComboboxModule } from '@fundamental-ngx/core/multi-combobox';
import { API_FILES } from '@fundamental-ngx/docs/cdk/shared';
import { ApiComponent, SharedDocumentationPageModule, currentComponentProvider } from '@fundamental-ngx/docs/shared';
import { FdpFormGroupModule } from '@fundamental-ngx/platform/form';
import { examples } from './examples';
import { CustomCdkControlExampleComponent } from './examples/default/forms-default-example.component';
import { FormsDocsComponent } from './forms-docs.component';
import { FormsHeaderComponent } from './forms-header/forms-header.component';

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
        MultiComboboxModule,
        examples,
        FormsDocsComponent,
        FormsHeaderComponent,
        CustomCdkControlExampleComponent
    ],
    exports: [RouterModule],
    providers: [currentComponentProvider('forms')]
})
export class FormsDocsModule {}
