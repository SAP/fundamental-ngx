import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ButtonComponent } from '@fundamental-ngx/core';
import { CardModule } from '@fundamental-ngx/core/card';

@Component({
    selector: 'fd-media-banner-card-example',
    templateUrl: './media-banner-card-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CardModule, ButtonComponent]
})
export class MediaBannerCardExampleComponent {}
