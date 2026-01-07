import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Avatar } from '@fundamental-ngx/ui5-webcomponents/avatar';
import { Icon } from '@fundamental-ngx/ui5-webcomponents/icon';
import { Tag } from '@fundamental-ngx/ui5-webcomponents/tag';
import '@ui5/webcomponents-icons/dist/AllIcons.js';

@Component({
    selector: 'ui5-avatar-types-sample',
    standalone: true,
    templateUrl: './avatar-types.html',
    imports: [Avatar, Tag, Icon],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AvatarTypesSample {}
