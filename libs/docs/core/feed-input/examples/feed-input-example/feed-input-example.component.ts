import { Component } from '@angular/core';
import { AvatarModule } from '@fundamental-ngx/core/avatar';
import { FeedInputModule } from '@fundamental-ngx/core/feed-input';
import { FormControlModule } from '@fundamental-ngx/core/form';

@Component({
    selector: 'fd-feed-input-example',
    templateUrl: './feed-input-example.component.html',
    standalone: true,
    imports: [FeedInputModule, AvatarModule, FormControlModule]
})
export class FeedInputExampleComponent {}
