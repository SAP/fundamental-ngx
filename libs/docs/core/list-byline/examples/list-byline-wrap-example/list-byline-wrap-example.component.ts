import { Component } from '@angular/core';
import { IconModule } from '@fundamental-ngx/core/icon';
import { ListModule } from '@fundamental-ngx/core/list';

@Component({
    selector: 'fd-list-byline-wrap-example',
    templateUrl: './list-byline-wrap-example.component.html',
    standalone: true,
    imports: [ListModule, IconModule]
})
export class ListBylineWrapExampleComponent {}
