import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { API_FILES } from '../../api-files';
import { SharedDocumentationPageModule } from '../../../documentation/shared-documentation-page.module';

import { PlatformActionBarHeaderComponent } from './platform-action-bar-header/platform-action-bar-header.component';
import { PlatformActionBarDocsComponent } from './platform-action-bar-docs.component';
import { PlatformActionBarExamplesComponent } from './platform-action-bar-examples/platform-action-bar-simple-example.component';
import { PlatformActionBarWithBackButtonExampleComponent } from './platform-action-bar-examples/platform-action-bar-with-back-button-example.component';
import { PlatformActionBarWithDescriptionExampleComponent } from './platform-action-bar-examples/platform-action-bar-with-description-example.component';
import { PlatformActionBarWithLongPageTitleExampleComponent } from './platform-action-bar-examples/platform-action-bar-with-long-title-example.component';
import { PlatformActionBarWithContextualMenuExampleComponent } from './platform-action-bar-examples/platform-action-bar-contextual-menu-example.component';
import { PlatformActionBarWithPositiveNegativeActionsExampleComponent } from './platform-action-bar-examples/platform-action-bar-positive-and-negative-action-example.component';
import { PlatformActionBarCozyModeExampleComponent } from './platform-action-bar-examples/platform-action-bar-cozy-mode-example.component';

import { PlatformButtonModule } from '@fundamental-ngx/platform/button';
import { PlatformMenuModule } from '@fundamental-ngx/platform/menu';
import { PlatformActionBarModule } from '@fundamental-ngx/platform/action-bar';
import { PlatformActionButtonGroupModule } from '@fundamental-ngx/platform/action-button-group';
import { platformContentDensityModuleDeprecationsProvider } from '@fundamental-ngx/platform/shared';

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
        SharedDocumentationPageModule,
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
        PlatformActionBarWithPositiveNegativeActionsExampleComponent,
        PlatformActionBarCozyModeExampleComponent
    ],
    providers: [platformContentDensityModuleDeprecationsProvider('fdp-action-bar')]
})
export class PlatformActionBarDocsModule {}
