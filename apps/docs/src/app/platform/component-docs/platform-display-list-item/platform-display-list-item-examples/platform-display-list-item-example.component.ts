import { Component } from '@angular/core';

@Component({
    selector: 'fdp-display-list-item-example',
    templateUrl: './platform-display-list-item-example.component.html'
})
export class PlatformDisplayListItemExampleComponent { }

@Component({
    selector: 'fdp-display-list-item-with-navigation-example',
    templateUrl: './platform-display-list-item-with-navigation-example.component.html'
})
export class PlatformDisplayListItemWithNavigationExampleComponent {
    items: any[] = [
        {
            'title': 'Item1',
            'secondary': 'First text first secondary text item  (Standard text item)'
        },
        {
            'title': 'Item2',
            'secondary': 'Second text second secondary text item  (Standard text item)'
        },
        {
            'title': 'Item3',
            'secondary': 'Third text third seconday text item  (Standard text item)'
        }];
}
