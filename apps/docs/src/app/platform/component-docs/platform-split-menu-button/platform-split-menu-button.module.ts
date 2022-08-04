import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { API_FILES } from '../../api-files';
import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { SharedDocumentationPageModule } from '../../../documentation/shared-documentation-page.module';

import { PlatformMenuModule } from '@fundamental-ngx/platform/menu';
import { PlatformSplitMenuButtonModule } from '@fundamental-ngx/platform/split-menu-button';
import { PlatformDocsSplitMenuButtonHeaderComponent } from './platform-split-menu-button-header/platform-split-menu-button-header.component';
import { PlatformDocsSplitMenuButtonComponent } from './platform-split-menu-button.component';
import { PlatformDocsSplitMenuButtonTypesComponent } from './platform-split-menu-button-examples/platform-split-button-types-example.component';
import { PlatformDocsSplitMenuButtonIconsComponent } from './platform-split-menu-button-examples/platform-split-button-icons-example.component';
import { PlatformDocsSplitMenuButtonBehaviorComponent } from './platform-split-menu-button-examples/platform-split-button-behaviors-example.component';
import { platformContentDensityModuleDeprecationsProvider } from '@fundamental-ngx/platform/shared';

const routes: Routes = [
    {
        path: '',
        component: PlatformDocsSplitMenuButtonHeaderComponent,
        children: [
            { path: '', component: PlatformDocsSplitMenuButtonComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.splitMenuButton } }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        SharedDocumentationPageModule,
        PlatformSplitMenuButtonModule,
        PlatformMenuModule
    ],
    exports: [RouterModule],
    declarations: [
        PlatformDocsSplitMenuButtonComponent,
        PlatformDocsSplitMenuButtonHeaderComponent,
        PlatformDocsSplitMenuButtonBehaviorComponent,
        PlatformDocsSplitMenuButtonTypesComponent,
        PlatformDocsSplitMenuButtonIconsComponent
    ],
    providers: [platformContentDensityModuleDeprecationsProvider('fdp-split-menu-button')]
})
export class PlatformSplitMenuButtonDocsModule {}
