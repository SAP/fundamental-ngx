import { Component } from '@angular/core';
import { NestedListModule } from '@fundamental-ngx/core/nested-list';
import { SideNavigationModule } from '@fundamental-ngx/core/side-navigation';

@Component({
    selector: 'fd-side-navigation-non-selectable-example',
    templateUrl: './side-navigation-non-selectable-example.component.html',
    standalone: true,
    imports: [SideNavigationModule, NestedListModule]
})
export class SideNavigationNonSelectableExampleComponent {}
