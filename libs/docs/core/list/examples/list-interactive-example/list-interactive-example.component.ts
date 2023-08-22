import { Component } from '@angular/core';
import { ListModule } from '@fundamental-ngx/core/list';

@Component({
    selector: 'fd-list-interactive-example',
    templateUrl: './list-interactive-example.component.html',
    standalone: true,
    imports: [ListModule]
})
export class ListInteractiveExampleComponent {}
