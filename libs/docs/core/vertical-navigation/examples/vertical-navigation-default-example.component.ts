import { Component } from '@angular/core';
import { IconModule } from '@fundamental-ngx/core/icon';
import { ListModule } from '@fundamental-ngx/core/list';
import { VerticalNavigationModule } from '@fundamental-ngx/core/vertical-navigation';

@Component({
    selector: 'fd-vertical-navigation-default-example',
    templateUrl: './vertical-navigation-default-example.component.html',
    standalone: true,
    imports: [VerticalNavigationModule, ListModule, IconModule]
})
export class VerticalNavigationDefaultExampleComponent {}
