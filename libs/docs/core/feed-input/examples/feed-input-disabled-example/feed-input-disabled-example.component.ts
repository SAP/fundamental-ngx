import { Component } from '@angular/core';
import { FormControlModule } from '@fundamental-ngx/core/form';
import { AvatarModule } from '@fundamental-ngx/core/avatar';
import { FeedInputModule } from '@fundamental-ngx/core/feed-input';

@Component({
    selector: 'fd-feed-input-disabled-example',
    templateUrl: './feed-input-disabled-example.component.html',
    standalone: true,
    imports: [FeedInputModule, AvatarModule, FormControlModule]
})
export class FeedInputDisabledExampleComponent {}
