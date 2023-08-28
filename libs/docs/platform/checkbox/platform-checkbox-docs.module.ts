import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { API_FILES } from '@fundamental-ngx/docs/platform/shared';
import { ApiComponent, SharedDocumentationPageModule, currentComponentProvider } from '@fundamental-ngx/docs/shared';
import { PlatformChekboxNoFormComponent } from './examples/platform-binary-checkbox-no-form.component';
import { PlatformCompactChekboxExampleComponent } from './examples/platform-binary-checkbox.component';
import { PlatformChekboxA11yExampleComponent } from './examples/platform-checkbox-a11y.component';
import { PlatformChekboxStyleComponent } from './examples/platform-checkbox-error-handling.component';
import { PlatformCozyChekboxExampleComponent } from './examples/platform-multiselect-checkbox.component';
import { PlatformChekboxTristateComponent } from './examples/platform-tristate-checkbox.component';
import { PlatformCheckboxDocsComponent } from './platform-checkbox-docs.component';
import { PlatformCheckboxHeaderComponent } from './platform-checkbox-header/platform-checkbox-header.component';

import { PlatformButtonModule } from '@fundamental-ngx/platform/button';
import { FdpFormGroupModule, PlatformCheckboxModule } from '@fundamental-ngx/platform/form';

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
        PlatformButtonModule,
        PlatformCheckboxDocsComponent,
        PlatformCheckboxHeaderComponent,
        PlatformCozyChekboxExampleComponent,
        PlatformCompactChekboxExampleComponent,
        PlatformChekboxStyleComponent,
        PlatformChekboxNoFormComponent,
        PlatformChekboxTristateComponent,
        PlatformChekboxA11yExampleComponent
    ],
    exports: [RouterModule],
    providers: [currentComponentProvider('checkbox')]
})
export class CheckboxDocsModule {}
