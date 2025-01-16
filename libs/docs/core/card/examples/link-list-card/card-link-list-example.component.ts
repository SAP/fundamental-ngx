import { Component } from '@angular/core';
import { AvatarComponent } from '@fundamental-ngx/core/avatar';
import { CardModule } from '@fundamental-ngx/core/card';
import { ListModule } from '@fundamental-ngx/core/list';

@Component({
    selector: 'fd-card-link-list-example',
    templateUrl: 'card-link-list-example.component.html',
    imports: [CardModule, ListModule, AvatarComponent]
})
export class CardLinkListExampleComponent {}
