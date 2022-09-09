import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ActionBarDocsComponent } from './action-bar-docs.component';
import { ActionBarHeaderComponent } from './action-bar-header/action-bar-header.component';
import {
    ActionBarContextualMenuExampleComponent,
    ActionBarNoBackExampleComponent
} from './examples/action-bar-examples.component';
import { ActionBarBackExampleComponent } from './examples/action-bar-back-example.component';
import { ActionBarLongStringTitleTruncationExampleComponent } from './examples/action-bar-long-string-title-truncation-example.component';
import { ActionBarMobileExampleComponent } from './examples/action-bar-mobile-example.component';

import { ApiComponent, currentComponentProvider, SharedDocumentationPageModule } from '@fundamental-ngx/docs/shared';
import { API_FILES } from '@fundamental-ngx/docs/core/shared';
import { ActionBarModule } from '@fundamental-ngx/core/action-bar';

const routes: Routes = [
    {
        path: '',
        component: ActionBarHeaderComponent,
        children: [
            { path: '', component: ActionBarDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.actionBar } }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes), SharedDocumentationPageModule, ActionBarModule],
    exports: [RouterModule],
    declarations: [
        ActionBarDocsComponent,
        ActionBarHeaderComponent,
        ActionBarBackExampleComponent,
        ActionBarMobileExampleComponent,
        ActionBarNoBackExampleComponent,
        ActionBarContextualMenuExampleComponent,
        ActionBarLongStringTitleTruncationExampleComponent
    ],
    providers: [currentComponentProvider('action-bar')]
})
export class ActionBarDocsModule {}
