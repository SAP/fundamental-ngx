import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { API_FILES } from '../../../api-files';
import { ApiComponent } from '../../../../documentation/core-helpers/api/api.component';
import { SharedDocumentationPageModule } from '../../../../documentation/shared-documentation-page.module';

import { PlatformSwitchModule, FdpFormGroupModule } from '@fundamental-ngx/platform/form';
import { SwitchDocsComponent } from './switch-docs.component';
import { DisabledSwitchExampleComponent } from './switch-examples/disabled-switch-example/disabled-switch-example.component';
import { SemanticSwitchExampleComponent } from './switch-examples/semantic-switch-example/semantic-switch-example.component';
import { SwitchFormsExampleComponent } from './switch-examples/switch-form-example/switch-forms-example.component';
import { SwitchSizesExampleComponent } from './switch-examples/switch-sizes-example/switch-sizes-example.component';
import { SwitchHeaderComponent } from './switch-header/switch-header.component';
import { SwitchConfigExampleComponent } from './switch-examples/switch-config-example/switch-config-example.component';
import { platformContentDensityModuleDeprecationsProvider } from '@fundamental-ngx/platform/shared';

const routes: Routes = [
    {
        path: '',
        component: SwitchHeaderComponent,
        children: [
            { path: '', component: SwitchDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.switch } }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes), SharedDocumentationPageModule, PlatformSwitchModule, FdpFormGroupModule],
    exports: [RouterModule],
    declarations: [
        SwitchHeaderComponent,
        SwitchDocsComponent,
        DisabledSwitchExampleComponent,
        SemanticSwitchExampleComponent,
        SwitchFormsExampleComponent,
        SwitchSizesExampleComponent,
        SwitchConfigExampleComponent
    ],
    providers: [platformContentDensityModuleDeprecationsProvider('fdp-switch')]
})
export class PlatformSwitchDocsModule {}
