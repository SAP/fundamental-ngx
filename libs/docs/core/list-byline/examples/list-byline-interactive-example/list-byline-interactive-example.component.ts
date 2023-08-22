import { Component } from '@angular/core';
import { IconModule } from '@fundamental-ngx/core/icon';
import { ListModule } from '@fundamental-ngx/core/list';

@Component({
    selector: 'fd-list-byline-interactive-example',
    templateUrl: './list-byline-interactive-example.component.html',
    standalone: true,
    imports: [ListModule, IconModule]
})
export class ListBylineInteractiveExampleComponent {}
