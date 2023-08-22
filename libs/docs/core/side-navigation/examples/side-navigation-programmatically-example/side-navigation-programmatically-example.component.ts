import { Component } from '@angular/core';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { NestedListModule } from '@fundamental-ngx/core/nested-list';
import { SideNavigationModule } from '@fundamental-ngx/core/side-navigation';

@Component({
    selector: 'fd-side-navigation-programmatically-example',
    templateUrl: './side-navigation-programmatically-example.component.html',
    standalone: true,
    imports: [SideNavigationModule, NestedListModule, ButtonModule]
})
export class SideNavigationProgrammaticallyExampleComponent {
    open = true;

    selected = true;
}
