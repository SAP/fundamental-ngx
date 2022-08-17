import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent } from '../../../../documentation/core-helpers/api/api.component';
import { API_FILES } from '../../../api-files';
import { SharedDocumentationPageModule } from '../../../../documentation/shared-documentation-page.module';
import { PlatformCheckboxDocsComponent } from './platform-checkbox-docs.component';
import { PlatformCheckboxHeaderComponent } from './platform-checkbox-header/platform-checkbox-header.component';
import { PlatformCozyChekboxExampleComponent } from './platform-checkbox-examples/platform-multiselect-checkbox.component';
import { PlatformCompactChekboxExampleComponent } from './platform-checkbox-examples/platform-binary-checkbox.component';
import { PlatformChekboxStyleComponent } from './platform-checkbox-examples/platform-checkbox-error-handling.component';
import { PlatformChekboxNoFormComponent } from './platform-checkbox-examples/platform-binary-checkbox-no-form.component';
import { PlatformChekboxTristateComponent } from './platform-checkbox-examples/platform-tristate-checkbox.component';
import { PlatformChekboxA11yExampleComponent } from './platform-checkbox-examples/platform-checkbox-a11y.component';

import { PlatformButtonModule } from '@fundamental-ngx/platform/button';
import { PlatformCheckboxModule, FdpFormGroupModule } from '@fundamental-ngx/platform/form';
import { platformContentDensityModuleDeprecationsProvider } from '@fundamental-ngx/platform/shared';

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
        SharedDocumentationPageModule,
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
        PlatformChekboxTristateComponent,
        PlatformChekboxA11yExampleComponent
    ],
    providers: [platformContentDensityModuleDeprecationsProvider('fdp-checkbox')]
})
export class CheckboxDocsModule {}
