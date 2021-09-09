import { NgModule } from '@angular/core';
import { IconTabBarDocsComponent } from './icon-tab-bar-docs.component';
import { IconTabBarHeaderComponent } from './icon-tab-bar-header/icon-tab-bar-header.component';
import { SharedDocumentationPageModule } from '../../../documentation/shared-documentation-page.module';
import { IconTabBarTextTypeExampleComponent } from './examples/icon-tab-bar-text-type-example/icon-tab-bar-text-type-example.component';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { API_FILES } from '../../api-files';
import { IconTabBarFilterTypeExampleComponent } from './examples/icon-tab-bar-filter-type-example/icon-tab-bar-filter-type-example.component';
import { IconTabBarProcessTypeExampleComponent } from './examples/icon-tab-bar-process-type-example/icon-tab-bar-process-type-example.component';
import { IconTabBarIconTypeExampleComponent } from './examples/icon-tab-bar-icon-type-example/icon-tab-bar-icon-type-example.component';
import { IconTabBarIconOnlyTypeExampleComponent } from './examples/icon-tab-bar-icon-only-type-example/icon-tab-bar-icon-only-type-example.component';
import { IconTabBarModule } from '@fundamental-ngx/core';

const routes: Routes = [
    {
        path: '',
        component: IconTabBarHeaderComponent,
        children: [
            { path: '', component: IconTabBarDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.iconTabBar } }
        ]
    }
];

@NgModule({
    declarations: [
        IconTabBarDocsComponent,
        IconTabBarHeaderComponent,
        IconTabBarTextTypeExampleComponent,
        IconTabBarFilterTypeExampleComponent,
        IconTabBarProcessTypeExampleComponent,
        IconTabBarIconTypeExampleComponent,
        IconTabBarIconOnlyTypeExampleComponent,
    ],
    imports: [
        RouterModule.forChild(routes),
        SharedDocumentationPageModule,
        IconTabBarModule,
    ]
})
export class IconTabBarDocsModule {
}
