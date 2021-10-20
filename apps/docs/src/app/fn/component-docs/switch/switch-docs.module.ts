import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { SharedDocumentationPageModule } from '../../../documentation/shared-documentation-page.module';
import { API_FILES } from '../../api-files';
import { SwitchHeaderComponent } from './switch-header/switch-header.component';
import { SwitchDocsComponent } from './switch-docs.component';
import { SwitchFormsExampleComponent } from './examples/switch-form-example/switch-forms-example.component';
import { SwitchBindingExampleComponent } from './examples/switch-binding-example/switch-binding-example.component';
import { DisabledSwitchExampleComponent } from './examples/disabled-switch-example/disabled-switch-example.component';
import { ExperimentalFormModule } from '@fundamental-ngx/fn/form';
import { ExperimentalSwitchModule } from '@fundamental-ngx/fn/switch';
import { ExperimentalButtonModule } from '@fundamental-ngx/fn/button';

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
    imports: [
        RouterModule.forChild(routes),
        SharedDocumentationPageModule,
        ExperimentalFormModule,
        ExperimentalButtonModule,
        ExperimentalSwitchModule
    ],
    exports: [RouterModule],
    declarations: [
        SwitchDocsComponent,
        SwitchHeaderComponent,
        SwitchFormsExampleComponent,
        SwitchBindingExampleComponent,
        DisabledSwitchExampleComponent
    ]
})
export class SwitchDocsModule {}
