import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { SharedDocumentationPageModule } from '../../../documentation/shared-documentation-page.module';
import { API_FILES } from '../../api-files';
import { ButtonHeaderComponent } from './button-header/button-header.component';
import { ButtonDocsComponent } from './button-docs.component';
import { examples } from './examples';
import { ExperimentalButtonModule } from '@fundamental-ngx/fn/button';

const routes: Routes = [
    {
        path: '',
        component: ButtonHeaderComponent,
        children: [
            {
                path: '',
                component: ButtonDocsComponent
            },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.button } }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes), SharedDocumentationPageModule, ExperimentalButtonModule],
    exports: [RouterModule],
    declarations: [examples, ButtonHeaderComponent, ButtonDocsComponent]
})
export class ButtonDocsModule {}
