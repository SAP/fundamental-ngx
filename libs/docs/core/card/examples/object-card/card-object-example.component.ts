import { Component } from '@angular/core';
import { AvatarModule } from '@fundamental-ngx/core/avatar';
import { CardModule } from '@fundamental-ngx/core/card';

@Component({
    selector: 'fd-card-object-example',
    templateUrl: 'card-object-example.component.html',
    styleUrls: ['./card-object-example.component.scss'],
    standalone: true,
    imports: [CardModule, AvatarModule]
})
export class CardObjectExampleComponent {}
