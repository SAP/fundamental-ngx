import { Component } from '@angular/core';
import { Avatar } from '@fundamental-ngx/ui5-webcomponents/avatar';
import { ExpandableText } from '@fundamental-ngx/ui5-webcomponents/expandable-text';
import { Label } from '@fundamental-ngx/ui5-webcomponents/label';
import { List } from '@fundamental-ngx/ui5-webcomponents/list';
import { ListItemCustom } from '@fundamental-ngx/ui5-webcomponents/list-item-custom';
import { ListItemGroup } from '@fundamental-ngx/ui5-webcomponents/list-item-group';
import { ListItemStandard } from '@fundamental-ngx/ui5-webcomponents/list-item-standard';
import { Title } from '@fundamental-ngx/ui5-webcomponents/title';

@Component({
    selector: 'ui5-list-wrapping-example',
    templateUrl: './wrapping.html',
    standalone: true,
    styles: [
        `
            .custom-list-item {
                display: flex;
                align-items: flex-start;
                gap: 1rem;
                padding: 0.5rem;
            }

            .custom-list-item__avatar {
                flex-shrink: 0;
            }

            .custom-list-item__content {
                flex: 1;
                display: flex;
                flex-direction: column;
                gap: 0.25rem;
            }

            .custom-list-item__title {
                margin: 0;
            }

            .custom-list-item__description {
                color: var(--sapNeutralTextColor);
            }

            .custom-list-item__additional {
                font-size: 0.875rem;
                color: var(--sapNeutralTextColor);
            }
        `
    ],
    imports: [List, ListItemGroup, ListItemStandard, ListItemCustom, Avatar, Label, ExpandableText, Title]
})
export class ListWrappingExample {}
