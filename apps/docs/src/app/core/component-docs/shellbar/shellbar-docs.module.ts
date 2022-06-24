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
import { DeprecatedShellbarCompactDirective, ShellbarModule } from '@fundamental-ngx/core/shellbar';
import { ComboboxModule } from '@fundamental-ngx/core/combobox';
import { SideNavigationModule } from '@fundamental-ngx/core/side-navigation';
import { ProductSwitchModule } from '@fundamental-ngx/core/product-switch';
import { TileModule } from '@fundamental-ngx/core/tile';
import { LayoutPanelModule } from '@fundamental-ngx/core/layout-panel';
import { SegmentedButtonModule } from '@fundamental-ngx/core/segmented-button';
import { ShellbarSideNavResponsiveExampleComponent } from './examples/shellbar-side-nav-responsive/shellbar-side-nav-responsive-example.component';
import { moduleDeprecationsProvider } from '@fundamental-ngx/core/utils';

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
        ShellbarCollapsibleExampleComponent,
        ShellbarSideNavResponsiveExampleComponent
    ],
    providers: [moduleDeprecationsProvider(DeprecatedShellbarCompactDirective)]
})
export class ShellbarDocsModule {}
