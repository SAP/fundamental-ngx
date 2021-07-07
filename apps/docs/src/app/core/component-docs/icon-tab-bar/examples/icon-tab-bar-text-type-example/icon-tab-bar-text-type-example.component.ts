import { Component } from '@angular/core';
import { IconTabBarItem } from '../../../../../../../../../libs/core/src/lib/icon-tab-bar/types';

@Component({
    selector: 'fd-icon-tab-bar-text-type-example',
    templateUrl: './icon-tab-bar-text-type-example.component.html',
    styleUrls: ['./icon-tab-bar-text-type-example.component.scss']
})
export class IconTabBarTextTypeExampleComponent {

    items: IconTabBarItem[] = [
        {
            id: 'item 1',
            label: 'Item 1',
            color: 'critical',
            subItems: [
                {
                    id: 'item 1',
                    label: 'Item 1',
                    color: 'critical',
                },
                {
                    id: 'item 2',
                    label: 'Item 2',
                    badge: true,
                },
                {
                    id: 'item 3',
                    label: 'Item 3',
                    counter: 100,
                    active: true,
                    subItems: [
                        {
                            id: 'Subitem 1',
                            label: 'Subitem 1',
                            color: 'critical',
                        },
                        {
                            id: 'item 2',
                            label: 'Subitem 2',
                            badge: true,
                        },
                        {
                            id: 'item 3',
                            label: 'Subitem 3',
                            counter: 100,
                            active: true,
                        },
                    ]
                },
            ]
        },
        {
            id: 'item 2',
            label: 'Item 2',
            badge: true,
        },
        {
            id: 'item 3',
            label: 'Item 3',
            counter: 100,
            active: true,
        },
        {
            id: 'item 2',
            label: 'Item 2',
            badge: true,
        },
        {
            id: 'item 2',
            label: 'Item 2',
            badge: true,
        },
        {
            id: 'item 2',
            label: 'Item 2',
            badge: true,
        },
        {
            id: 'item 2',
            label: 'Item 2',
            badge: true,
        },
        {
            id: 'item 3',
            label: 'Item 3',
            counter: 100,
            active: true,
        },
        {
            id: 'item 2',
            label: 'Item 2',
            badge: true,
        },
        {
            id: 'item 2',
            label: 'Item 2',
            badge: true,
        },
        {
            id: 'item 2',
            label: 'Item 2',
            badge: true,
        },
        {
            id: 'item 2',
            label: 'Item 2',
            badge: true,
        },
    ];
}
