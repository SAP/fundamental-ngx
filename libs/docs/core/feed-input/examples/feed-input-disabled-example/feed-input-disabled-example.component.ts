import { Component } from '@angular/core';
import { AvatarComponent } from '@fundamental-ngx/core/avatar';
import { FeedInputModule } from '@fundamental-ngx/core/feed-input';
import { FormControlComponent } from '@fundamental-ngx/core/form';

@Component({
    selector: 'fd-feed-input-disabled-example',
    templateUrl: './feed-input-disabled-example.component.html',
    standalone: true,
    imports: [FeedInputModule, AvatarComponent, FormControlComponent]
})
export class FeedInputDisabledExampleComponent {}
