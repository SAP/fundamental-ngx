import { Component } from '@angular/core';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { IconComponent } from '@fundamental-ngx/core/icon';
import { ListModule } from '@fundamental-ngx/core/list';

@Component({
    selector: 'fd-list-byline-button-example',
    templateUrl: './list-byline-button-example.component.html',
    imports: [ListModule, IconComponent, ButtonComponent]
})
export class ListBylineButtonExampleComponent {}
