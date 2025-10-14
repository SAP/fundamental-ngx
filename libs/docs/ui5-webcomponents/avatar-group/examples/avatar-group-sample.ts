import { Component } from '@angular/core';
import { Avatar } from '@fundamental-ngx/ui5-webcomponents/avatar';
import { AvatarGroup } from '@fundamental-ngx/ui5-webcomponents/avatar-group';

@Component({
    selector: 'ui5-avatar-group-sample',
    templateUrl: './avatar-group-sample.html',
    standalone: true,
    imports: [AvatarGroup, Avatar]
})
export class AvatarGroupExample {}
