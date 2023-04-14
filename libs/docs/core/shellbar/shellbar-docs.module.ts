import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent, currentComponentProvider, SharedDocumentationPageModule } from '@fundamental-ngx/docs/shared';
import { API_FILES } from '@fundamental-ngx/docs/core/shared';
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
import { InitialFocusModule, moduleDeprecationsProvider } from '@fundamental-ngx/cdk/utils';
import { PlatformSearchFieldModule } from '@fundamental-ngx/platform/search-field';
import { ShellbarResponsiveExampleComponent } from './examples/shellbar-responsive-example/shellbar-responsive-example.component';
import { ShellbarGrowingGroupExampleComponent } from './examples/shellbar-growing-group-example/shellbar-growing-group-example.component';

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
        SegmentedButtonModule,
        PlatformSearchFieldModule
    ],
    exports: [RouterModule, ShellbarResponsiveExampleComponent, ShellbarGrowingGroupExampleComponent],
    declarations: [
        ShellbarDocsComponent,
        ShellbarDocsHeaderComponent,
        ShellbarBasicExampleComponent,
        ShellbarSideNavExampleComponent,
        ShellbarCollapsibleExampleComponent,
        ShellbarSideNavResponsiveExampleComponent,
        ShellbarResponsiveExampleComponent,
        ShellbarGrowingGroupExampleComponent
    ],
    providers: [moduleDeprecationsProvider(DeprecatedShellbarCompactDirective), currentComponentProvider('shellbar')]
})
export class ShellbarDocsModule {}
