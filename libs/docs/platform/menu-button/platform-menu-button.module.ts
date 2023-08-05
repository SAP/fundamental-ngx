import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent, currentComponentProvider, SharedDocumentationPageModule } from '@fundamental-ngx/docs/shared';
import { API_FILES } from '@fundamental-ngx/docs/platform/shared';

import { PlatformMenuModule } from '@fundamental-ngx/platform/menu';
import { PlatformMenuButtonModule } from '@fundamental-ngx/platform/menu-button';
import { PlatformMenuButtonHeaderComponent } from './platform-menu-button-header/platform-menu-button-header.component';
import { PlatformMenuButtonDocsComponent } from './platform-menu-button-docs.component';
import { PlatformMenuButtonCompactExampleComponent } from './examples/platform-menu-button-compact-examples.component';
import { PlatformMenuButtonCozyExampleComponent } from './examples/platform-menu-button-cozy-examples.component';
import { PlatformMenuButtonExampleComponent } from './examples/platform-menu-button-examples.component';


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
    providers: [
        platformContentDensityModuleDeprecationsProvider('fdp-menu-button'),
        currentComponentProvider('menu-button')
    ]
})
export class PlatformMenuButtonDocsModule {}
