import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { API_FILES } from '../../api-files';
import { VerticalNavigationDocsComponent } from './vertical-navigation-docs.component';
import { SharedDocumentationPageModule } from '../../../documentation/shared-documentation-page.module';
import { VerticalNavigationDefaultExampleComponent } from './examples/vertical-navigation-default-example.component';
import { VerticalNavigationModule } from '@fundamental-ngx/core/vertical-navigation';
import { TableModule } from '@fundamental-ngx/core/table';
import { IconModule } from '@fundamental-ngx/core/icon';
import { ListModule } from '@fundamental-ngx/core/list';
import { VerticalNavigationHeaderComponent } from './vertical-navigation-header/vertical-navigation-header.component';
import { VerticalNavigationCondensedExampleComponent } from './examples/vertical-navigation-condensed-example.component';
import { VerticalNavigationNoIconsExampleComponent } from './examples/vertical-navigation-no-icons-example.component';
import { VerticalNavigationGroupingExampleComponent } from './examples/vertical-navigation-grouping-example.component';

const routes: Routes = [
    {
        path: '',
        component: VerticalNavigationHeaderComponent,
        children: [
            { path: '', component: VerticalNavigationDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.verticalNavigation } }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        SharedDocumentationPageModule,
        VerticalNavigationModule,
        TableModule,
        ListModule,
        IconModule
    ],
    declarations: [
        VerticalNavigationDocsComponent,
        VerticalNavigationHeaderComponent,
        VerticalNavigationDefaultExampleComponent,
        VerticalNavigationCondensedExampleComponent,
        VerticalNavigationNoIconsExampleComponent,
        VerticalNavigationGroupingExampleComponent
    ]
})
export class VerticalNavigationDocsModule {}
