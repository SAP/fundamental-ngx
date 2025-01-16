import { Component } from '@angular/core';
import { IconComponent } from '@fundamental-ngx/core/icon';
import { ListModule } from '@fundamental-ngx/core/list';

@Component({
    selector: 'fd-list-byline-borderless-example',
    templateUrl: './list-byline-borderless-example.component.html',
    imports: [ListModule, IconComponent]
})
export class ListBylineBorderlessExampleComponent {}
