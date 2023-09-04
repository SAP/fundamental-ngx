import { Component } from '@angular/core';
import { AvatarModule } from '@fundamental-ngx/core/avatar';
import { FeedListItemModule } from '@fundamental-ngx/core/feed-list-item';

@Component({
    selector: 'fd-fli-avatar-example',
    templateUrl: './fli-avatar-example.component.html',
    standalone: true,
    imports: [FeedListItemModule, AvatarModule]
})
export class FliAvatarExampleComponent {}
