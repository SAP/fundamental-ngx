import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { API_FILES } from '../../api-files';
import { InputHeaderComponent } from './input-header/input-header.component';
import { InputDocsComponent } from './input-docs.component';
import { InputExampleComponent, InputStateExampleComponent } from './examples/input-examples.component';
import { SharedDocumentationPageModule } from '../../../documentation/shared-documentation-page.module';
import { InputModule } from '@fundamental-ngx/fn/input';
import { DisabledBehaviorModule, ReadonlyBehaviorModule } from '@fundamental-ngx/fn/cdk';
import { InputFormExampleComponent } from './examples/input-form-example.component';

const routes: Routes = [
    {
        path: '',
        component: InputHeaderComponent,
        children: [
            { path: '', component: InputDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.input } }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        SharedDocumentationPageModule,
        InputModule,
        ReadonlyBehaviorModule,
        DisabledBehaviorModule
    ],
    exports: [RouterModule],
    declarations: [
        InputDocsComponent,
        InputHeaderComponent,
        InputExampleComponent,
        InputStateExampleComponent,
        InputFormExampleComponent
    ]
})
export class InputDocsModule {}
