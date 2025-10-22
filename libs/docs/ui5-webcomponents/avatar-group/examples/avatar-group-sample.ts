import { Component } from '@angular/core';
import { Avatar } from '@fundamental-ngx/ui5-webcomponents/avatar';
import { AvatarGroup } from '@fundamental-ngx/ui5-webcomponents/avatar-group';
import { AvatarColorScheme } from '@fundamental-ngx/ui5-webcomponents/types';
import '@ui5/webcomponents-icons/dist/AllIcons.js';

@Component({
    selector: 'ui5-avatar-group-sample',
    templateUrl: './avatar-group-sample.html',
    standalone: true,
    imports: [AvatarGroup, Avatar]
})
export class AvatarGroupExample {
    // Color scheme array for demonstrating colorScheme input
    // Each avatar gets its own color scheme array (though typically one scheme per avatar)
    avatarColorSchemes: AvatarColorScheme[] = [
        AvatarColorScheme.Accent1,
        AvatarColorScheme.Accent2,
        AvatarColorScheme.Accent3,
        AvatarColorScheme.Accent4,
        AvatarColorScheme.Accent5,
        AvatarColorScheme.Accent6
    ];

    // Mixed color schemes including Auto and Placeholder
    mixedColorSchemes: AvatarColorScheme[] = [
        AvatarColorScheme.Accent7,
        AvatarColorScheme.Auto,
        AvatarColorScheme.Accent8,
        AvatarColorScheme.Placeholder,
        AvatarColorScheme.Accent9
    ];
}
