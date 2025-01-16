import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
    ButtonComponent,
    FormModule,
    ObjectStatusComponent,
    RatingIndicatorComponent,
    TextComponent
} from '@fundamental-ngx/core';
import { AvatarComponent } from '@fundamental-ngx/core/avatar';
import { CardModule } from '@fundamental-ngx/core/card';
import { ListModule } from '@fundamental-ngx/core/list';

@Component({
    selector: 'fd-card-example',
    templateUrl: './card-example.component.html',
    styleUrls: ['./card-example.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        CardModule,
        ListModule,
        FormModule,
        AvatarComponent,
        ButtonComponent,
        TextComponent,
        ObjectStatusComponent,
        RatingIndicatorComponent
    ]
})
export class CardExampleComponent {}
