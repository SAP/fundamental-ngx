import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { API_FILES } from '../../api-files';
import { CheckboxHeaderComponent } from './checkbox-header/checkbox-header.component';
import { CheckboxDocsComponent } from './checkbox-docs.component';
import { SharedDocumentationPageModule } from '../../../documentation/shared-documentation-page.module';
import { examples } from './examples';
import { FormModule } from '@fundamental-ngx/core/form';
import { CheckboxModule, DeprecatedCheckboxContentDensityDirective } from '@fundamental-ngx/core/checkbox';
import { moduleDeprecationsProvider } from '@fundamental-ngx/core/utils';

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
    providers: [moduleDeprecationsProvider(DeprecatedCheckboxContentDensityDirective)]
})
export class CheckboxDocsModule {}
