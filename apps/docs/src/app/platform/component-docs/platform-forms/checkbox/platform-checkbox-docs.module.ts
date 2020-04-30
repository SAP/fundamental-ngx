import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent } from '../../../../documentation/core-helpers/api/api.component';
import { API_FILES } from '../../../api-files';
import { SharedDocumentationModule } from '../../../../documentation/shared-documentation.module';
import { PlatformCheckboxDocsComponent } from './platform-checkbox-docs.component';
import { PlatformCheckboxHeaderComponent } from './platform-checkbox-header/platform-checkbox-header.component';
import { PlatformCozyChekboxExampleComponent } from './platform-checkbox-examples/platform-multiselect-checkbox.component';
import { PlatformCompactChekboxExampleComponent } from './platform-checkbox-examples/platform-binary-checkbox.component';
import { PlatformChekboxStyleComponent } from './platform-checkbox-examples/platform-checkbox-error-handling.component';
import { PlatformChekboxNoFormComponent } from './platform-checkbox-examples/platform-binary-checkbox-no-form.component';
import { PlatformChekboxTristateComponent } from './platform-checkbox-examples/platform-tristate-checkbox.component';
import { PlatformCheckboxModule, FdpFormGroupModule, PlatformButtonModule } from '@fundamental-ngx/platform';

const routes: Routes = [
    {
        path: '',
        component: PlatformCheckboxHeaderComponent,
        children: [
            { path: '', component: PlatformCheckboxDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.checkbox } }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        SharedDocumentationModule,
        PlatformCheckboxModule,
        FdpFormGroupModule,
        PlatformButtonModule
    ],
    exports: [RouterModule],
    declarations: [
        PlatformCheckboxDocsComponent,
        PlatformCheckboxHeaderComponent,
        PlatformCozyChekboxExampleComponent,
        PlatformCompactChekboxExampleComponent,
        PlatformChekboxStyleComponent,
        PlatformChekboxNoFormComponent,
        PlatformChekboxTristateComponent
    ]
})
export class CheckboxDocsModule {}
