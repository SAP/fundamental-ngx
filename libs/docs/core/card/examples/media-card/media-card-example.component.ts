import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AvatarComponent, ButtonComponent } from '@fundamental-ngx/core';
import { CardModule } from '@fundamental-ngx/core/card';

@Component({
    selector: 'fd-media-card-example',
    templateUrl: './media-card-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CardModule, AvatarComponent, ButtonComponent]
})
export class MediaCardExampleComponent {}
