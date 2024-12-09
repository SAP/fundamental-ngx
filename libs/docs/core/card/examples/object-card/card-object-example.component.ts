import { Component } from '@angular/core';
import { AvatarComponent } from '@fundamental-ngx/core/avatar';
import { CardModule } from '@fundamental-ngx/core/card';

@Component({
    selector: 'fd-card-object-example',
    templateUrl: 'card-object-example.component.html',
    styleUrls: ['./card-object-example.component.scss'],
    imports: [CardModule, AvatarComponent]
})
export class CardObjectExampleComponent {}
