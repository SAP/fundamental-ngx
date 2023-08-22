import { Component } from '@angular/core';
import { FormControlModule } from '@fundamental-ngx/core/form';
import { FeedInputModule } from '@fundamental-ngx/core/feed-input';

@Component({
    selector: 'fd-feed-input-no-avatar-example',
    templateUrl: './feed-input-no-avatar-example.component.html',
    standalone: true,
    imports: [FeedInputModule, FormControlModule]
})
export class FeedInputNoAvatarExampleComponent {}
