import { Component } from '@angular/core';
import { ListModule } from '@fundamental-ngx/core/list';

@Component({
    selector: 'fd-list-navigation-example',
    templateUrl: './list-navigation-example.component.html',
    standalone: true,
    imports: [ListModule]
})
export class ListNavigationExampleComponent {}
