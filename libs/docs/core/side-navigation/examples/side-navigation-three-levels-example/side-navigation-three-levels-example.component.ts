import { Component } from '@angular/core';
import { NestedListModule } from '@fundamental-ngx/core/nested-list';
import { SideNavigationModule } from '@fundamental-ngx/core/side-navigation';

@Component({
    selector: 'fd-side-navigation-three-levels-example',
    templateUrl: './side-navigation-three-levels-example.component.html',
    standalone: true,
    imports: [SideNavigationModule, NestedListModule]
})
export class SideNavigationThreeLevelsExampleComponent {}
