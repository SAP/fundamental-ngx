import { Component } from '@angular/core';
import { AvatarComponent } from '@fundamental-ngx/core/avatar';
import { FeedListItemModule } from '@fundamental-ngx/core/feed-list-item';

@Component({
    selector: 'fd-fli-avatar-example',
    templateUrl: './fli-avatar-example.component.html',
    imports: [FeedListItemModule, AvatarComponent]
})
export class FliAvatarExampleComponent {}
