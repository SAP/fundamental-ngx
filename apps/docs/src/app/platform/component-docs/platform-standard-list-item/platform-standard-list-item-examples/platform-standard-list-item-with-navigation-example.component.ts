import { Component } from '@angular/core';

interface Item {
    title: string;
    description: string;
    secondary: string;
    routerLink?: string;
}

@Component({
    selector: 'fdp-platform-standard-list-item-with-navigation-example',
    templateUrl: './platform-standard-list-item-with-navigation-example.component.html'
})
export class PlatformStandardListItemWithNavigationExampleComponent {
    items: Item[] = [
        {
            title: 'Item1',
            description: 'First text item in Byline (Standard text item)',
            secondary: 'Second text item in Byline (Can be semantic (Status) or not)'
        },
        {
            title: 'Item2',
            description: 'First text item in Byline (Standard text item)',
            secondary: 'Second text item in Byline (Can be semantic (Status) or not)',
            routerLink: '#'
        },
        {
            title: 'Item3',
            description: 'First text item in Byline (Standard text item)',
            secondary: 'Second text item in Byline (Can be semantic (Status) or not)',
            routerLink: '#'
        }
    ];
}
