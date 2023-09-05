import { Component } from '@angular/core';
import { IconModule } from '@fundamental-ngx/core/icon';
import { ListModule } from '@fundamental-ngx/core/list';

@Component({
    selector: 'fd-list-byline-borderless-example',
    templateUrl: './list-byline-borderless-example.component.html',
    standalone: true,
    imports: [ListModule, IconModule]
})
export class ListBylineBorderlessExampleComponent {}
