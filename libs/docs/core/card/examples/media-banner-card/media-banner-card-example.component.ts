import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AvatarComponent, ButtonComponent, TextComponent } from '@fundamental-ngx/core';
import { CardModule } from '@fundamental-ngx/core/card';

@Component({
    selector: 'fd-media-banner-card-example',
    templateUrl: './media-banner-card-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CardModule, AvatarComponent, ButtonComponent, TextComponent]
})
export class MediaBannerCardExampleComponent {}
