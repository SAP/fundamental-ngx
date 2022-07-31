import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { AvatarModule } from '@fundamental-ngx/core/avatar';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { PlatformMenuModule } from '@fundamental-ngx/platform/menu';

import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { API_FILES } from '../../api-files';
import { SharedDocumentationPageModule } from '../../../documentation/shared-documentation-page.module';
import { PlatformMenuHeaderComponent } from './platform-menu-header/platform-menu-header.component';
import { PlatformMenuDocsComponent } from './platform-menu-docs.component';
import { PlatformMenuBasicExampleComponent } from './platform-menu-examples/platform-menu-basic-example.component';
import { PlatformMenuCascadeExampleComponent } from './platform-menu-examples/platform-menu-cascade-example.component';
import { PlatformMenuScrollingExampleComponent } from './platform-menu-examples/platform-menu-scrolling-example.component';
import { PlatformMenuXPositionExampleComponent } from './platform-menu-examples/platform-menu-x-position-example.component';
import { PlatformMenuWithIconsExampleComponent } from './platform-menu-examples/platform-menu-with-icons-example.component';
import { platformContentDensityModuleDeprecationsProvider } from '@fundamental-ngx/platform/shared';

const routes: Routes = [
    {
        path: '',
        component: PlatformMenuHeaderComponent,
        children: [
            { path: '', component: PlatformMenuDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.menu } }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        SharedDocumentationPageModule,
        PlatformMenuModule,
        ButtonModule,
        AvatarModule,
        ScrollingModule
    ],
    exports: [RouterModule],
    declarations: [
        PlatformMenuDocsComponent,
        PlatformMenuHeaderComponent,
        PlatformMenuBasicExampleComponent,
        PlatformMenuCascadeExampleComponent,
        PlatformMenuScrollingExampleComponent,
        PlatformMenuXPositionExampleComponent,
        PlatformMenuWithIconsExampleComponent
    ],
    providers: [platformContentDensityModuleDeprecationsProvider('fdp-menu')]
})
export class PlatformMenuDocsModule {}
