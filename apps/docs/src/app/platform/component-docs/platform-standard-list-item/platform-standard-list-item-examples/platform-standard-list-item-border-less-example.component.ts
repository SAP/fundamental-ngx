import { Component } from '@angular/core';
@Component({
    selector: 'fdp-borderless-standard-list-item-example',
    templateUrl: './platform-borderless-standard-list-item-example.component.html'
})
export class PlatformStandardListItemBorderLessExampleComponent {
    items: any[] = [
        {
            'title': 'Item1',
            'avatarTitle': 'nature', 'description': 'First text item in Byline (Standard text item)', 'secondary': 'Second text item in Byline (Can be semantic (Status) or not)', 'avatarSrc': 'https://placeimg.com/400/400/nature'
        },
        {
            'title': 'Item2', 'avatarSrc': 'https://placeimg.com/400/400/nature',
            'avatarTitle': 'nature', 'description': 'First text item in Byline (Standard text item)', 'secondary': 'Second text item in Byline (Can be semantic (Status) or not)'
        },
        {
            'title': 'Item3', 'avatarSrc': 'https://placeimg.com/400/400/nature',
            'avatarTitle': 'nature', 'description': 'First text item in Byline (Standard text item)', 'secondary': 'Second text item in Byline (Can be semantic (Status) or not)'
        },
        {
            'title': 'Item4', 'avatarSrc': 'https://placeimg.com/400/400/nature',
            'avatarTitle': 'nature', 'description': 'First text item in Byline (Standard text item)', 'secondary': 'Second text item in Byline (Can be semantic (Status) or not)'
        }];

}
