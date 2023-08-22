import { Component } from '@angular/core';
import { StandardListItemModule } from '@fundamental-ngx/platform/list';
import { PlatformListModule } from '@fundamental-ngx/platform/list';

interface Item {
    title: string;
    description: string;
    secondary: string;
}

@Component({
    selector: 'fdp-platform-standard-list-item-with-footer-example',
    templateUrl: './platform-standard-list-item-with-footer-example.component.html',
    standalone: true,
    imports: [PlatformListModule, StandardListItemModule]
})
export class PlatformStandardListItemWithFooterExampleComponent {
    items: Item[] = [
        {
            title: 'Item1',
            description: 'First text item in Byline (Standard text item)',
            secondary: 'Second text item in Byline (Can be semantic (Status) or not)'
        },
        {
            title: 'Item2',
            description: 'First text item in Byline (Standard text item)',
            secondary: 'Second text item in Byline (Can be semantic (Status) or not)'
        },
        {
            title: 'Item3',
            description: 'First text item in Byline (Standard text item)',
            secondary: 'Second text item in Byline (Can be semantic (Status) or not)'
        }
    ];
}
