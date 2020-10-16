import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { SharedDocumentationPageModule } from '../../../documentation/shared-documentation-page.module';
import { API_FILES } from '../../api-files';
import { ShellbarDocsHeaderComponent } from './shellbar-docs-header/shellbar-docs-header.component';
import { ShellbarDocsComponent } from './shellbar-docs.component';
import { ShellbarBasicExampleComponent } from './examples/shellbar-basic-example.component';
import { ShellbarSideNavExampleComponent } from './examples/shellbar-side-nav/shellbar-side-nav-example.component';
import { ShellbarCollapsibleExampleComponent } from './examples/shellbar-collapsible-example.component';
import {
    ComboboxModule,
    LayoutPanelModule,
    ProductSwitchModule,
    SegmentedButtonModule,
    ShellbarModule,
    SideNavigationModule,
    TileModule
} from '@fundamental-ngx/core';

const routes: Routes = [
    {
        path: '',
        component: ShellbarDocsHeaderComponent,
        children: [
            { path: '', component: ShellbarDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.shellbar } }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        SharedDocumentationPageModule,
        ShellbarModule,
        ComboboxModule,
        SideNavigationModule,
        ProductSwitchModule,
        TileModule,
        LayoutPanelModule,
        SegmentedButtonModule
    ],
    exports: [RouterModule],
    declarations: [
        ShellbarDocsComponent,
        ShellbarDocsHeaderComponent,
        ShellbarBasicExampleComponent,
        ShellbarSideNavExampleComponent,
        ShellbarCollapsibleExampleComponent
    ]
})
export class ShellbarDocsModule {}
