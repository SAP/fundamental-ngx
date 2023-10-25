import { Component } from '@angular/core';
import { AvatarComponent } from '@fundamental-ngx/core/avatar';
import { FeedInputModule } from '@fundamental-ngx/core/feed-input';
import { FormControlComponent } from '@fundamental-ngx/core/form';

@Component({
    selector: 'fd-feed-input-placeholder-example',
    templateUrl: './feed-input-placeholder-example.component.html',
    standalone: true,
    imports: [FeedInputModule, AvatarComponent, FormControlComponent]
})
export class FeedInputPlaceholderExampleComponent {}
