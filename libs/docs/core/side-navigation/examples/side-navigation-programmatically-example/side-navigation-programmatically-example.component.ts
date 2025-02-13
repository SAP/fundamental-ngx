import { Component } from '@angular/core';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { NestedListModule } from '@fundamental-ngx/core/nested-list';
import { SideNavigationModule } from '@fundamental-ngx/core/side-navigation';

@Component({
    selector: 'fd-side-navigation-programmatically-example',
    templateUrl: './side-navigation-programmatically-example.component.html',
    imports: [SideNavigationModule, NestedListModule, ButtonComponent]
})
export class SideNavigationProgrammaticallyExampleComponent {
    open = true;

    selected = true;
}
