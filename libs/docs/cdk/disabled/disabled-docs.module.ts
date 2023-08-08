import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClickedBehaviorModule, DisabledBehaviorModule, FocusableListModule } from '@fundamental-ngx/cdk/utils';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { DisabledHeaderComponent } from './disabled-header/disabled-header.component';
import { DiExampleComponent } from './examples/di-example/di-example.component';
import { ApiComponent, currentComponentProvider, SharedDocumentationPageModule } from '@fundamental-ngx/docs/shared';
import { API_FILES } from '@fundamental-ngx/docs/cdk/shared';
import { DisabledDocsComponent } from './disabled-docs.component';
import { DefaultExampleComponent } from './examples/default-example/default-example.component';
import { DisabledRecipientDirective } from './examples/di-example/disabled-recipient.directive';

const routes: Routes = [
    {
        path: '',
        component: DisabledHeaderComponent,
        children: [
            {
                path: '',
                component: DisabledDocsComponent
            },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.disabled } }
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
        DisabledHeaderComponent,
        DisabledDocsComponent,
        DefaultExampleComponent,
        DiExampleComponent,
        DisabledRecipientDirective
    ],
    providers: [currentComponentProvider('disabled')]
})
export class DisabledDocsModule {}
