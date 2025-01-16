import { Component } from '@angular/core';
import { ListModule } from '@fundamental-ngx/core/list';
import { VerticalNavigationModule } from '@fundamental-ngx/core/vertical-navigation';

@Component({
    selector: 'fd-vertical-navigation-no-icons-example',
    templateUrl: './vertical-navigation-no-icons-example.component.html',
    imports: [VerticalNavigationModule, ListModule]
})
export class VerticalNavigationNoIconsExampleComponent {}
