import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { AvatarModule } from '@fundamental-ngx/core/avatar';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { PlatformMenuModule } from '@fundamental-ngx/platform/menu';

import { ApiComponent, currentComponentProvider, SharedDocumentationPageModule } from '@fundamental-ngx/docs/shared';
import { API_FILES } from '@fundamental-ngx/docs/platform/shared';
import { PlatformMenuHeaderComponent } from './platform-menu-header/platform-menu-header.component';
import { PlatformMenuDocsComponent } from './platform-menu-docs.component';
import { PlatformMenuBasicExampleComponent } from './examples/platform-menu-basic-example.component';
import { PlatformMenuCascadeExampleComponent } from './examples/platform-menu-cascade-example.component';
import { PlatformMenuScrollingExampleComponent } from './examples/platform-menu-scrolling-example.component';
import { PlatformMenuXPositionExampleComponent } from './examples/platform-menu-x-position-example.component';
import { PlatformMenuWithIconsExampleComponent } from './examples/platform-menu-with-icons-example.component';

import { ScrollbarDirective } from '@fundamental-ngx/core/scrollbar';

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
        ScrollingModule,
        ScrollbarDirective
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
    providers: [currentComponentProvider('menu')]
})
export class PlatformMenuDocsModule {}
