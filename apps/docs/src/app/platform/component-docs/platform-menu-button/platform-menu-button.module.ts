import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { API_FILES } from '../../api-files';
import { SharedDocumentationPageModule } from '../../../documentation/shared-documentation-page.module';

import { PlatformMenuModule } from '@fundamental-ngx/platform/menu';
import { PlatformMenuButtonModule } from '@fundamental-ngx/platform/menu-button';
import { PlatformMenuButtonHeaderComponent } from './platform-menu-button-header/platform-menu-button-header.component';
import { PlatformMenuButtonDocsComponent } from './platform-menu-button-docs.component';
import { PlatformMenuButtonCompactExampleComponent } from './platform-menu-button-examples/platform-menu-button-compact-examples.component';
import { PlatformMenuButtonCozyExampleComponent } from './platform-menu-button-examples/platform-menu-button-cozy-examples.component';
import { PlatformMenuButtonExampleComponent } from './platform-menu-button-examples/platform-menu-button-examples.component';
import { platformContentDensityModuleDeprecationsProvider } from '@fundamental-ngx/platform/shared';

const routes: Routes = [
    {
        path: '',
        component: PlatformMenuButtonHeaderComponent,
        children: [
            { path: '', component: PlatformMenuButtonDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.menuButton } }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        SharedDocumentationPageModule,
        PlatformMenuButtonModule,
        PlatformMenuModule
    ],
    exports: [RouterModule],
    declarations: [
        PlatformMenuButtonDocsComponent,
        PlatformMenuButtonHeaderComponent,
        PlatformMenuButtonCompactExampleComponent,
        PlatformMenuButtonCozyExampleComponent,
        PlatformMenuButtonExampleComponent
    ],
    providers: [platformContentDensityModuleDeprecationsProvider('fdp-menu-button')]
})
export class PlatformMenuButtonDocsModule {}
