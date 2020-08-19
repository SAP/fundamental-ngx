import { Component } from '@angular/core';


@Component({
    selector: 'fdp-standard-list-item-with-single-selection-example',
    templateUrl: './platform-standard-list-item-with-single-selection-example.component.html'
})
export class PlatformStandardListItemWithSingleSelectionExampleComponent {
    selectedItems: any[] = [];
    radioItems: any[] = [
        {
            'avatarSrc': 'https://placeimg.com/400/400/nature',
            'avatarTitle': 'nature',
            'title': 'Item1', 'name': 'singleSelect',
            'description': 'First text item in Byline (Standard text item)',
            'secondary': 'Second text item in Byline (Can be semantic (Status) or not)'
        },
        {
            'avatarSrc': 'https://placeimg.com/400/400/nature',
            'avatarTitle': 'nature', 'title': 'Item2', 'name': 'singleSelect',
            'description': 'First text item in Byline (Standard text item)',
            'secondary': 'Second text item in Byline (Can be semantic (Status) or not)'
        },
        {
            'avatarSrc': 'https://placeimg.com/400/400/nature',
            'avatarTitle': 'nature', 'title': 'Item3',
            'description': 'First text item in Byline (Standard text item)',
            'name': 'singleSelect'
        },
        {
            'avatarSrc': 'https://placeimg.com/400/400/nature',
            'avatarTitle': 'nature', 'title': 'Item4', 'name': 'singleSelect',
            'description': 'First text item in Byline (Standard text item)',
            'secondary': 'Second text item in Byline (Can be semantic (Status) or not)'
        }];

    showItemInfo(event: any): void {
        this.selectedItems = event[0].id;
    }

}
