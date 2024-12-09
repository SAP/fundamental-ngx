import { Component } from '@angular/core';
import { FeedInputModule } from '@fundamental-ngx/core/feed-input';
import { FormControlComponent } from '@fundamental-ngx/core/form';

@Component({
    selector: 'fd-feed-input-no-avatar-example',
    templateUrl: './feed-input-no-avatar-example.component.html',
    imports: [FeedInputModule, FormControlComponent]
})
export class FeedInputNoAvatarExampleComponent {}
