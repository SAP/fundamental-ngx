import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent, currentComponentProvider, SharedDocumentationPageModule } from '@fundamental-ngx/docs/shared';
import { API_FILES } from '@fundamental-ngx/docs/core/shared';
import { CheckboxHeaderComponent } from './checkbox-header/checkbox-header.component';
import { CheckboxDocsComponent } from './checkbox-docs.component';
import { examples } from './examples';
import { FormModule } from '@fundamental-ngx/core/form';
import { CheckboxDisplayModeExampleComponent } from './examples/checkbox-display-mode-example.component';
import { CheckboxModule } from '@fundamental-ngx/core/checkbox';

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
    imports: [FormModule, CheckboxModule, RouterModule.forChild(routes), SharedDocumentationPageModule],
    exports: [RouterModule, CheckboxDisplayModeExampleComponent],
    declarations: [examples, CheckboxDocsComponent, CheckboxHeaderComponent, CheckboxDisplayModeExampleComponent],
    providers: [
        currentComponentProvider('checkbox')
    ]
})
export class CheckboxDocsModule {}
