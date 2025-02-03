import { Component } from '@angular/core';
import { AvatarComponent } from '@fundamental-ngx/core/avatar';
import { FeedInputModule } from '@fundamental-ngx/core/feed-input';
import { FormControlComponent } from '@fundamental-ngx/core/form';

@Component({
    selector: 'fd-feed-input-circle-avatar-example',
    templateUrl: './feed-input-circle-avatar-example.component.html',
    imports: [FeedInputModule, AvatarComponent, FormControlComponent]
})
export class FeedInputCircleAvatarExampleComponent {}
