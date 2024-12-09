import { Component } from '@angular/core';
import { NestedListModule } from '@fundamental-ngx/core/nested-list';
import { SideNavigationModule } from '@fundamental-ngx/core/side-navigation';

@Component({
    selector: 'fd-side-navigation-multiple-selected-example',
    templateUrl: 'side-navigation-multiple-selected-example.component.html',
    imports: [SideNavigationModule, NestedListModule]
})
export class SideNavigationMultipleSelectedExampleComponent {}
