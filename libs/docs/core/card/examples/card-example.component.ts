import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AvatarModule } from '@fundamental-ngx/core/avatar';
import { CardModule } from '@fundamental-ngx/core/card';
import { ListModule } from '@fundamental-ngx/core/list';

@Component({
    selector: 'fd-card-example',
    templateUrl: './card-example.component.html',
    styleUrls: ['./card-example.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [CardModule, ListModule, AvatarModule]
})
export class CardExampleComponent {}
