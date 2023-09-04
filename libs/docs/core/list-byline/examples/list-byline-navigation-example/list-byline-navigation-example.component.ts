import { Component } from '@angular/core';
import { IconModule } from '@fundamental-ngx/core/icon';
import { ListModule } from '@fundamental-ngx/core/list';

@Component({
    selector: 'fd-list-byline-navigation-example',
    templateUrl: './list-byline-navigation-example.component.html',
    standalone: true,
    imports: [ListModule, IconModule]
})
export class ListBylineNavigationExampleComponent {}
