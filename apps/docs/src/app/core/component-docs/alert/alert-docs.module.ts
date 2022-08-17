import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { API_FILES } from '../../api-files';
import { AlertDocsComponent } from './alert-docs.component';
import { AlertExampleComponent } from './examples/alert-example.component';
import { AlertComponentAsContentExampleComponent } from './examples/alert-component-as-content-example.component';
import { AlertContentComponent } from './examples/alert-content.component';
import { AlertInlineExampleComponent } from './examples/alert-inline-example.component';
import { AlertWidthExampleComponent } from './examples/alert-width-example.component';
import { AlertHeaderComponent } from './alert-header/alert-header.component';
import { AlertModule, AlertService } from '@fundamental-ngx/core/alert';
import { SharedDocumentationPageModule } from '../../../documentation/shared-documentation-page.module';

const routes: Routes = [
    {
        path: '',
        component: AlertHeaderComponent,
        children: [
            { path: '', component: AlertDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.alert } }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes), SharedDocumentationPageModule, AlertModule],
    exports: [RouterModule],
    declarations: [
        AlertHeaderComponent,
        AlertDocsComponent,
        AlertExampleComponent,
        AlertComponentAsContentExampleComponent,
        AlertContentComponent,
        AlertInlineExampleComponent,
        AlertWidthExampleComponent
    ],
    providers: [AlertService]
})
export class AlertDocsModule {}
