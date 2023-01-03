import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent, currentComponentProvider, SharedDocumentationPageModule } from '@fundamental-ngx/docs/shared';
import { API_FILES } from '@fundamental-ngx/docs/cdk/shared';
import { FormsHeaderComponent } from './forms-header/forms-header.component';
import { FormsDocsComponent } from './forms-docs.component';
import { examples } from './examples';
import { FormsModule } from '@fundamental-ngx/cdk/forms';

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
    imports: [RouterModule.forChild(routes), SharedDocumentationPageModule, FormsModule],
    exports: [RouterModule],
    declarations: [examples, FormsDocsComponent, FormsHeaderComponent],
    providers: [currentComponentProvider('forms')]
})
export class FormsDocsModule {}
