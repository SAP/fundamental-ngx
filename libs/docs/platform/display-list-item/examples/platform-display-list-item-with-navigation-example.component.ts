import { Component } from '@angular/core';
import { DisplayListItemModule } from '@fundamental-ngx/platform/list';
import { PlatformListModule } from '@fundamental-ngx/platform/list';

export interface Corona {
    title: string;
    secondary: string;
}

@Component({
    selector: 'fdp-platform-display-list-item-with-navigation-example',
    templateUrl: './platform-display-list-item-with-navigation-example.component.html',
    standalone: true,
    imports: [PlatformListModule, DisplayListItemModule]
})
export class PlatformDisplayListItemWithNavigationExampleComponent {
    items: Corona[] = [
        {
            title: 'First Stage',
            secondary: 'First stage take medical help on call (Standard text)'
        },
        {
            title: 'Second Stage',
            secondary: 'Second stage take medical help in person (Standard text)'
        },
        {
            title: 'Third Stage',
            secondary: 'Third stage admit in hospital (Standard text)'
        }
    ];
}
