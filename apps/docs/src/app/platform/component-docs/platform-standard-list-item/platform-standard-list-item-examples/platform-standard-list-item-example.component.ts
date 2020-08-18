import { Component } from '@angular/core';

@Component({
    selector: 'fdp-standard-list-item-example',
    templateUrl: './platform-standard-list-item-example.component.html'
})
export class PlatformStandardListItemExampleComponent { }

@Component({
    selector: 'fdp-standard-list-item-with-secondary-type-example',
    templateUrl: './platform-standard-list-item-with-secondary-type-example.component.html'
})
export class PlatformStandardListItemWithSecondaryTypeExampleComponent { }


@Component({
    selector: 'fdp-standard-list-item-with-footer-example',
    templateUrl: './platform-standard-list-item-with-footer-example.component.html'
})
export class PlatformStandardListItemWithFooterExampleComponent {

    items: any[] = [
        {
            'title': 'Item1', 'description': 'First text item in Byline (Standard text item)',
            'secondary': 'Second text item in Byline (Can be semantic (Status) or not)'
        },
        {
            'title': 'Item2', 'description': 'First text item in Byline (Standard text item)',
            'secondary': 'Second text item in Byline (Can be semantic (Status) or not)'
        },
        {
            'title': 'Item3', 'description': 'First text item in Byline (Standard text item)',
            'secondary': 'Second text item in Byline (Can be semantic (Status) or not)'
        }];
}

@Component({
    selector: 'fdp-standard-list-item-with-selection-example',
    templateUrl: './platform-standard-list-item-with-selection-example.component.html'
})
export class PlatformStandardListItemWithSelectionExampleComponent {
    selectedItems: any[] = [];
    items: any[] = [
        {
            'titleIcon': 'cancel-share', 'title': 'Item1', 'checkboxValue': 'check1',
            'description': 'First text item in Byline (Standard text item)',
            'secondary': 'Second text item in Byline (Can be semantic (Status) or not)'
        },
        {
            'titleIcon': 'fob-watch', 'title': 'Item2', 'checkboxValue':
                'check2', 'description': 'First text item in Byline (Standard text item)',
            'secondary': 'Second text item in Byline (Can be semantic (Status) or not)'
        },
        {
            'titleIcon': 'folder-full', 'title': 'Item3', 'checkboxValue': 'check3',
            'description': 'First text item in Byline (Standard text item)',
            'secondary': 'Second text item in Byline (Can be semantic (Status) or not)'
        },
        {
            'titleIcon': 'heating-cooling', 'title': 'Item4',
            'checkboxValue': 'check4',
            'description': 'First text item in Byline (Standard text item)',
            'secondary': 'Second text item in Byline (Can be semantic (Status) or not)'
        }];

    showItemInfo(event: any): void {
        this.selectedItems = event;
    }

}


@Component({
    selector: 'fdp-standard-list-item-with-navigation-example',
    templateUrl: './platform-standard-list-item-with-navigation-example.component.html'
})
export class PlatformStandardListItemWithNavigationExampleComponent {
    items: any[] = [
        {
            'title': 'Item1', 'description': 'First text item in Byline (Standard text item)',
            'secondary': 'Second text item in Byline (Can be semantic (Status) or not)'
        },
        {
            'title': 'Item2', 'description': 'First text item in Byline (Standard text item)',
            'secondary': 'Second text item in Byline (Can be semantic (Status) or not)',
            'href': '#'
        },
        {
            'title': 'Item3', 'description': 'First text item in Byline (Standard text item)',
            'secondary': 'Second text item in Byline (Can be semantic (Status) or not)',
            'href': '#'
        }];
}
