import { Component, signal } from '@angular/core';
import { Avatar } from '@fundamental-ngx/ui5-webcomponents/avatar';
import { Icon } from '@fundamental-ngx/ui5-webcomponents/icon';
import { List } from '@fundamental-ngx/ui5-webcomponents/list';
import { ListItemGroup } from '@fundamental-ngx/ui5-webcomponents/list-item-group';
import { ListItemStandard } from '@fundamental-ngx/ui5-webcomponents/list-item-standard';

// Import the icon used in this example
import '@ui5/webcomponents-icons/dist/navigation-right-arrow.js';

@Component({
    selector: 'ui5-list-grouping-example',
    templateUrl: './grouping.html',
    standalone: true,
    imports: [List, ListItemStandard, ListItemGroup, Avatar, Icon]
})
export class ListGroupingExample {
    frontEndDevs = signal([
        {
            name: 'Jennifer',
            avatar: 'https://ui5.github.io/webcomponents/nightly/images/avatars/woman_avatar_3.png',
            alt: 'Woman image'
        },
        {
            name: 'Lora',
            avatar: 'https://ui5.github.io/webcomponents/nightly/images/avatars/woman_avatar_4.png',
            alt: 'Woman image'
        },
        {
            name: 'Carlotta',
            avatar: 'https://ui5.github.io/webcomponents/nightly/images/avatars/woman_avatar_5.png',
            alt: 'Woman image'
        }
    ]);

    backEndDevs = signal([
        {
            name: 'Clark',
            avatar: 'https://ui5.github.io/webcomponents/nightly/images/avatars/man_avatar_1.png',
            alt: 'Man image'
        },
        {
            name: 'Ellen',
            avatar: 'https://ui5.github.io/webcomponents/nightly/images/avatars/woman_avatar_1.png',
            alt: 'Woman image'
        },
        {
            name: 'Adam',
            avatar: 'https://ui5.github.io/webcomponents/nightly/images/avatars/man_avatar_3.png',
            alt: 'Man image'
        }
    ]);
}
