import { NgModule } from '@angular/core';
import { IconTabBarDocsComponent } from './icon-tab-bar-docs.component';
import { IconTabBarHeaderComponent } from './icon-tab-bar-header/icon-tab-bar-header.component';
import { SharedDocumentationPageModule } from '../../../documentation/shared-documentation-page.module';
import { IconTabBarExampleComponent } from './examples/icon-tab-bar-example.component';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { API_FILES } from '../../api-files';
import { IconTabBarModule } from '../../../../../../../libs/core/src/lib/icon-tab-bar';

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
        IconTabBarExampleComponent,
    ],
    imports: [
        RouterModule.forChild(routes),
        SharedDocumentationPageModule,
        IconTabBarModule,
    ]
})
export class IconTabBarDocsModule {
}
