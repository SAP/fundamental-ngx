import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent, currentComponentProvider, SharedDocumentationPageModule } from '@fundamental-ngx/docs/shared';
import { API_FILES } from '@fundamental-ngx/docs/fn/shared';
import { CheckboxHeaderComponent } from './checkbox-header/checkbox-header.component';
import { CheckboxDocsComponent } from './checkbox-docs.component';
import { examples } from './examples';
import { FormModule } from '@fundamental-ngx/fn/form';
import { CheckboxModule } from '@fundamental-ngx/fn/checkbox';

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
    exports: [RouterModule],
    declarations: [examples, CheckboxDocsComponent, CheckboxHeaderComponent],
    providers: [currentComponentProvider('checkbox')]
})
export class CheckboxDocsModule {}
