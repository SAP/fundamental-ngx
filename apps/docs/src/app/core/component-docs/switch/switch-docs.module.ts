import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { SharedDocumentationPageModule } from '../../../documentation/shared-documentation-page.module';
import { API_FILES } from '../../api-files';
import { SwitchHeaderComponent } from './switch-header/switch-header.component';
import { SwitchDocsComponent } from './switch-docs.component';
import { SwitchSizesExampleComponent } from './examples/switch-sizes-example/switch-sizes-example.component';
import { SwitchFormsExampleComponent } from './examples/switch-form-example/switch-forms-example.component';
import { SwitchBindingExampleComponent } from './examples/switch-binding-example/switch-binding-example.component';
import { SemanticSwitchExampleComponent } from './examples/semantic-switch-example/semantic-switch-example.component';
import { DisabledSwitchExampleComponent } from './examples/disabled-switch-example/disabled-switch-example.component';
import { FormModule } from '@fundamental-ngx/core/form';
import { DeprecatedSwitchCompactDirective, SwitchModule } from '@fundamental-ngx/core/switch';
import { moduleDeprecationsProvider } from '@fundamental-ngx/core/utils';

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
    imports: [RouterModule.forChild(routes), SharedDocumentationPageModule, FormModule, SwitchModule],
    exports: [RouterModule],
    declarations: [
        SwitchDocsComponent,
        SwitchHeaderComponent,
        SwitchSizesExampleComponent,
        SwitchFormsExampleComponent,
        SwitchBindingExampleComponent,
        SemanticSwitchExampleComponent,
        DisabledSwitchExampleComponent
    ],
    providers: [moduleDeprecationsProvider(DeprecatedSwitchCompactDirective)]
})
export class SwitchDocsModule {}
