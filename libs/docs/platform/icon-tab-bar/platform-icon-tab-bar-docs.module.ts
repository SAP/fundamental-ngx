import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ApiComponent, currentComponentProvider, SharedDocumentationPageModule } from '@fundamental-ngx/docs/shared';

import { PlatformIconTabBarDocsComponent } from './platform-icon-tab-bar-docs.component';
import { PlatformIconTabBarHeaderComponent } from './platform-icon-tab-bar-header/platform-icon-tab-bar-header.component';
import { PlatformIconTabBarTextTypeExampleComponent } from './examples/platform-icon-tab-bar-text-type-example/platform-icon-tab-bar-text-type-example.component';
import { PlatformIconTabBarFilterTypeExampleComponent } from './examples/platform-icon-tab-bar-filter-type-example/platform-icon-tab-bar-filter-type-example.component';
import { PlatformIconTabBarProcessTypeExampleComponent } from './examples/platform-icon-tab-bar-process-type-example/platform-icon-tab-bar-process-type-example.component';
import { PlatformIconTabBarIconTypeExampleComponent } from './examples/platform-icon-tab-bar-icon-type-example/platform-icon-tab-bar-icon-type-example.component';
import { PlatformIconTabBarIconOnlyTypeExampleComponent } from './examples/platform-icon-tab-bar-icon-only-type-example/platform-icon-tab-bar-icon-only-type-example.component';
import { PlatformIconTabBarConfigurablePaddingsExampleComponent } from './examples/platform-icon-tab-bar-configurable-paddings-example/platform-icon-tab-bar-configurable-paddings-example.component';
import { API_FILES } from '@fundamental-ngx/docs/platform/shared';
import { PlatformIconTabBarModule } from '@fundamental-ngx/platform/icon-tab-bar';

const routes: Routes = [
    {
        path: '',
        component: PlatformIconTabBarHeaderComponent,
        children: [
            { path: '', component: PlatformIconTabBarDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.iconTabBar } }
        ]
    }
];

@NgModule({
    declarations: [
        PlatformIconTabBarDocsComponent,
        PlatformIconTabBarHeaderComponent,
        PlatformIconTabBarTextTypeExampleComponent,
        PlatformIconTabBarFilterTypeExampleComponent,
        PlatformIconTabBarProcessTypeExampleComponent,
        PlatformIconTabBarIconTypeExampleComponent,
        PlatformIconTabBarIconOnlyTypeExampleComponent,
        PlatformIconTabBarConfigurablePaddingsExampleComponent
    ],
    imports: [RouterModule.forChild(routes), SharedDocumentationPageModule, PlatformIconTabBarModule],
    providers: [currentComponentProvider('icon-tab-bar')]
})
export class PlatformIconTabBarDocsModule {}
