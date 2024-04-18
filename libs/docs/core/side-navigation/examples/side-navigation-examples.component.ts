import { Component } from '@angular/core';
import { NestedListModule } from '@fundamental-ngx/core/nested-list';
import { SideNavigationModule } from '@fundamental-ngx/core/side-navigation';

@Component({
    selector: 'fd-side-navigation-example',
    templateUrl: './side-navigation-example.component.html',
    standalone: true,
    imports: [SideNavigationModule, NestedListModule]
})
export class SideNavigationExampleComponent {}

@Component({
    selector: 'fd-side-navigation-icons-example',
    templateUrl: './side-navigation-icons-example.component.html',
    standalone: true,
    imports: [SideNavigationModule, NestedListModule]
})
export class SideNavigationIconsExampleComponent {}
