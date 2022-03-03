import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent } from '../../../../documentation/core-helpers/api/api.component';
import { SharedDocumentationPageModule } from '../../../../documentation/shared-documentation-page.module';
import { API_FILES } from '../../../api-files';
import { FnDisabledDocsComponent } from './fn-disabled-docs.component';
import { DefaultExampleComponent } from './examples/default-example/default-example.component';
import { DisabledBehaviorModule, FocusableListModule } from '@fundamental-ngx/fn/cdk';
import { FnDisabledHeaderComponent } from './fn-disabled-header/fn-disabled-header.component';
import { DiExampleComponent, FnDisabledRecipientDirective } from './examples/di-example/di-example.component';

const routes: Routes = [
    {
        path: '',
        component: FnDisabledHeaderComponent,
        children: [
            {
                path: '',
                component: FnDisabledDocsComponent
            },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.tabs } }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        SharedDocumentationPageModule,
        DisabledBehaviorModule,
        FocusableListModule
    ],
    exports: [RouterModule],
    declarations: [
        FnDisabledHeaderComponent,
        FnDisabledDocsComponent,
        DefaultExampleComponent,
        DiExampleComponent,
        FnDisabledRecipientDirective
    ]
})
export class FnDisabledDocsModule {}
