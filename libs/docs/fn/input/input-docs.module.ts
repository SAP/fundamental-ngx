import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent, currentComponentProvider, SharedDocumentationPageModule } from '@fundamental-ngx/docs/shared';
import { API_FILES } from '@fundamental-ngx/docs/fn/shared';
import { InputHeaderComponent } from './input-header/input-header.component';
import { InputDocsComponent } from './input-docs.component';
import { InputExampleComponent, InputStateExampleComponent } from './examples/input-examples.component';
import { InputModule } from '@fundamental-ngx/fn/input';
import { DisabledBehaviorModule, ReadonlyBehaviorModule } from '@fundamental-ngx/cdk/utils';
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
    ],
    providers: [currentComponentProvider('input')]
})
export class InputDocsModule {}
