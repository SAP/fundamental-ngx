import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckboxModule } from '@fundamental-ngx/core/checkbox';
import { FormModule } from '@fundamental-ngx/core/form';
import { API_FILES } from '@fundamental-ngx/docs/core/shared';
import { ApiComponent, SharedDocumentationPageModule, currentComponentProvider } from '@fundamental-ngx/docs/shared';
import { CheckboxDocsComponent } from './checkbox-docs.component';
import { CheckboxHeaderComponent } from './checkbox-header/checkbox-header.component';
import { examples } from './examples';
import { CheckboxDisplayModeExampleComponent } from './examples/checkbox-display-mode-example.component';

const routes: Routes = [
    {
        path: '',
        component: CheckboxHeaderComponent,
        children: [
            { path: '', component: CheckboxDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.checkbox } }
        ]
    }
];

@NgModule({
    imports: [
        FormModule,
        CheckboxModule,
        RouterModule.forChild(routes),
        SharedDocumentationPageModule,
        examples,
        CheckboxDocsComponent,
        CheckboxHeaderComponent,
        CheckboxDisplayModeExampleComponent
    ],
    exports: [RouterModule, CheckboxDisplayModeExampleComponent],
    providers: [currentComponentProvider('checkbox')]
})
export class CheckboxDocsModule {}
