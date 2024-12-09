import { Component } from '@angular/core';
import { IconComponent } from '@fundamental-ngx/core/icon';
import { ListModule } from '@fundamental-ngx/core/list';

@Component({
    selector: 'fd-list-byline-wrap-example',
    templateUrl: './list-byline-wrap-example.component.html',
    imports: [ListModule, IconComponent]
})
export class ListBylineWrapExampleComponent {}
