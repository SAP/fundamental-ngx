import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { API_FILES } from '../../api-files';
import { SharedDocumentationModule } from '../../../documentation/shared-documentation.module';

import { PlatformActionBarHeaderComponent } from './platform-action-bar-header/platform-action-bar-header.component';
import { PlatformActionBarDocsComponent } from './platform-action-bar-docs.component';
import { PlatformActionBarExamplesComponent } from './platform-action-bar-examples/platform-action-bar-simple-example.component';
import { PlatformActionBarWithBackButtonExampleComponent } from './platform-action-bar-examples/platform-action-bar-with-back-button-example.component';
import { PlatformActionBarWithDescriptionExampleComponent } from './platform-action-bar-examples/platform-action-bar-with-description-example.component';
import { PlatformActionBarWithLongPageTitleExampleComponent } from './platform-action-bar-examples/platform-action-bar-with-long-title-example.component';
import { PlatformActionBarWithContextualMenuExampleComponent } from './platform-action-bar-examples/platform-action-bar-contextual-menu-example.component';
import { PlatformActionBarWithPositiveNegativeActionsExampleComponent } from './platform-action-bar-examples/platform-action-bar-positive-and-negative-action-example.component';

import {
    PlatformActionBarModule,
    PlatformButtonModule,
    PlatformMenuModule,
    PlatformActionButtonGroupModule
} from '@fundamental-ngx/platform';

const routes: Routes = [
    {
        path: '',
        component: PlatformActionBarHeaderComponent,
        children: [
            { path: '', component: PlatformActionBarDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.actionbar } }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        SharedDocumentationModule,
        PlatformActionBarModule,
        PlatformButtonModule,
        PlatformMenuModule,
        PlatformActionButtonGroupModule
    ],
    exports: [RouterModule],
    declarations: [
        PlatformActionBarDocsComponent,
        PlatformActionBarHeaderComponent,
        PlatformActionBarExamplesComponent,
        PlatformActionBarWithBackButtonExampleComponent,
        PlatformActionBarWithDescriptionExampleComponent,
        PlatformActionBarWithLongPageTitleExampleComponent,
        PlatformActionBarWithContextualMenuExampleComponent,
        PlatformActionBarWithPositiveNegativeActionsExampleComponent
    ]
})
export class PlatformActionBarDocsModule {}
