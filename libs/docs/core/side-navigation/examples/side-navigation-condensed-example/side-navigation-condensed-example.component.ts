import { Component } from '@angular/core';
import { NestedListModule } from '@fundamental-ngx/core/nested-list';
import { SideNavigationModule } from '@fundamental-ngx/core/side-navigation';

@Component({
    selector: 'fd-side-navigation-condensed-example,',
    templateUrl: 'side-navigation-condensed-example.component.html',
    imports: [SideNavigationModule, NestedListModule]
})
export class SideNavigationCondensedExampleComponent {}
