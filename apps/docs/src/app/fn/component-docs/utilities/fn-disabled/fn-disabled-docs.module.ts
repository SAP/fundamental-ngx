import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClickedBehaviorModule, DisabledBehaviorModule, FocusableListModule } from '@fundamental-ngx/fn/cdk';
import { ButtonModule } from '@fundamental-ngx/fn/button';
import { FnDisabledHeaderComponent } from './fn-disabled-header/fn-disabled-header.component';
import { DiExampleComponent } from './examples/di-example/di-example.component';
import { ApiComponent } from '../../../../documentation/core-helpers/api/api.component';
import { SharedDocumentationPageModule } from '../../../../documentation/shared-documentation-page.module';
import { API_FILES } from '../../../api-files';
import { FnDisabledDocsComponent } from './fn-disabled-docs.component';
import { DefaultExampleComponent } from './examples/default-example/default-example.component';
import { FnDisabledRecipientDirective } from './examples/di-example/fn-disabled-recipient.directive';

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
        FocusableListModule,
        ClickedBehaviorModule,
        ButtonModule
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
