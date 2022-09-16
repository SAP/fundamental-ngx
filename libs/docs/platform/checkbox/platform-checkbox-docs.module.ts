import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent, currentComponentProvider, SharedDocumentationPageModule } from '@fundamental-ngx/docs/shared';
import { API_FILES } from '@fundamental-ngx/docs/platform/shared';
import { PlatformCheckboxDocsComponent } from './platform-checkbox-docs.component';
import { PlatformCheckboxHeaderComponent } from './platform-checkbox-header/platform-checkbox-header.component';
import { PlatformCozyChekboxExampleComponent } from './examples/platform-multiselect-checkbox.component';
import { PlatformCompactChekboxExampleComponent } from './examples/platform-binary-checkbox.component';
import { PlatformChekboxStyleComponent } from './examples/platform-checkbox-error-handling.component';
import { PlatformChekboxNoFormComponent } from './examples/platform-binary-checkbox-no-form.component';
import { PlatformChekboxTristateComponent } from './examples/platform-tristate-checkbox.component';
import { PlatformChekboxA11yExampleComponent } from './examples/platform-checkbox-a11y.component';

import { PlatformButtonModule } from '@fundamental-ngx/platform/button';
import { FdpFormGroupModule, PlatformCheckboxModule } from '@fundamental-ngx/platform/form';
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
    providers: [platformContentDensityModuleDeprecationsProvider('fdp-checkbox'), currentComponentProvider('checkbox')]
})
export class CheckboxDocsModule {}
