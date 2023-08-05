import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { API_FILES } from '@fundamental-ngx/docs/platform/shared';
import { ApiComponent, currentComponentProvider, SharedDocumentationPageModule } from '@fundamental-ngx/docs/shared';

import { PlatformMenuModule } from '@fundamental-ngx/platform/menu';
import { PlatformSplitMenuButtonModule } from '@fundamental-ngx/platform/split-menu-button';
import { PlatformDocsSplitMenuButtonHeaderComponent } from './platform-split-menu-button-header/platform-split-menu-button-header.component';
import { PlatformDocsSplitMenuButtonComponent } from './platform-split-menu-button.component';
import { PlatformDocsSplitMenuButtonTypesComponent } from './examples/platform-split-button-types-example.component';
import { PlatformDocsSplitMenuButtonIconsComponent } from './examples/platform-split-button-icons-example.component';
import { PlatformDocsSplitMenuButtonBehaviorComponent } from './examples/platform-split-button-behaviors-example.component';


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
    providers: [
        platformContentDensityModuleDeprecationsProvider('fdp-split-menu-button'),
        currentComponentProvider('split-menu-button')
    ]
})
export class PlatformSplitMenuButtonDocsModule {}
