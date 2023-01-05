import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClickedBehaviorModule, DisabledBehaviorModule, FocusableListModule } from '@fundamental-ngx/cdk/utils';
import { ButtonModule } from '@fundamental-ngx/fn/button';
import { fdkDisabledHeaderComponent } from './fn-disabled-header/fn-disabled-header.component';
import { DiExampleComponent } from './examples/di-example/di-example.component';
import { ApiComponent, currentComponentProvider, SharedDocumentationPageModule } from '@fundamental-ngx/docs/shared';
import { API_FILES } from '@fundamental-ngx/docs/fn/shared';
import { fdkDisabledDocsComponent } from './fn-disabled-docs.component';
import { DefaultExampleComponent } from './examples/default-example/default-example.component';
import { fdkDisabledRecipientDirective } from './examples/di-example/fn-disabled-recipient.directive';

const routes: Routes = [
    {
        path: '',
        component: fdkDisabledHeaderComponent,
        children: [
            {
                path: '',
                component: fdkDisabledDocsComponent
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
        fdkDisabledHeaderComponent,
        fdkDisabledDocsComponent,
        DefaultExampleComponent,
        DiExampleComponent,
        fdkDisabledRecipientDirective
    ],
    providers: [currentComponentProvider('fn-disabled')]
})
export class fdkDisabledDocsModule {}
