import { Component } from '@angular/core';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { IconModule } from '@fundamental-ngx/core/icon';
import { ListModule } from '@fundamental-ngx/core/list';

@Component({
    selector: 'fd-list-byline-button-example',
    templateUrl: './list-byline-button-example.component.html',
    standalone: true,
    imports: [ListModule, IconModule, ButtonModule]
})
export class ListBylineButtonExampleComponent {}
