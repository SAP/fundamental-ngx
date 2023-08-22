import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent, currentComponentProvider, SharedDocumentationPageModule } from '@fundamental-ngx/docs/shared';
import { API_FILES } from '@fundamental-ngx/docs/core/shared';
import { SwitchHeaderComponent } from './switch-header/switch-header.component';
import { SwitchDocsComponent } from './switch-docs.component';
import { SwitchSizesExampleComponent } from './examples/switch-sizes-example/switch-sizes-example.component';
import { SwitchFormsExampleComponent } from './examples/switch-form-example/switch-forms-example.component';
import { SwitchBindingExampleComponent } from './examples/switch-binding-example/switch-binding-example.component';
import { SemanticSwitchExampleComponent } from './examples/semantic-switch-example/semantic-switch-example.component';
import { DisabledSwitchExampleComponent } from './examples/disabled-switch-example/disabled-switch-example.component';
import { FormModule } from '@fundamental-ngx/core/form';
import { SwitchModule } from '@fundamental-ngx/core/switch';

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
    providers: [currentComponentProvider('switch')]
})
export class SwitchDocsModule {}
