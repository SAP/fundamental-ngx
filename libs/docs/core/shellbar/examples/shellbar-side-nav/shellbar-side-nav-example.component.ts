import { Component, ViewEncapsulation } from '@angular/core';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { LayoutPanelModule } from '@fundamental-ngx/core/layout-panel';
import { NestedListModule } from '@fundamental-ngx/core/nested-list';
import { ShellbarComponent, ShellbarLogoComponent, ShellbarSidenavDirective } from '@fundamental-ngx/core/shellbar';
import { SideNavigationModule } from '@fundamental-ngx/core/side-navigation';

@Component({
    selector: 'fd-shellbar-side-nav-example',
    templateUrl: './shellbar-side-nav-example.component.html',
    styleUrls: ['./shellbar-side-nav-example.component.scss'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [
        ShellbarComponent,
        ButtonModule,
        ShellbarSidenavDirective,
        ShellbarLogoComponent,
        SideNavigationModule,
        NestedListModule,
        LayoutPanelModule
    ]
})
export class ShellbarSideNavExampleComponent {
    condensed = false;
}
