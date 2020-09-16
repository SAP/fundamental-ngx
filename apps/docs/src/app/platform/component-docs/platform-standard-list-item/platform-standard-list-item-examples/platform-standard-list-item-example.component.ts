import { Component } from '@angular/core';

@Component({
    selector: 'fdp-standard-list-item-example',
    templateUrl: './platform-standard-list-item-example.component.html'
})
export class PlatformStandardListItemExampleComponent { }

@Component({
    selector: 'fdp-non-byline-standard-list-item-example',
    templateUrl: './platform-non-byline-standard-list-item-example.component.html'
})
export class PlatformNonByLineStandardListItemExampleComponent { }


@Component({
    selector: 'fdp-standard-list-item-with-secondary-type-example',
    templateUrl: './platform-standard-list-item-with-secondary-type-example.component.html'
})
export class PlatformStandardListItemWithSecondaryTypeExampleComponent { }

@Component({
    selector: '<fdp-standard-list-item-with-inverted-secondary-type-example>',
    templateUrl: './platform-standard-list-item-with-inverted-secondary-type-example.component.html'
})
export class PlatformStandardListItemWithInvertedSecondaryTypeExampleComponent { }

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
            'routerLink': '#'
        },
        {
            'title': 'Item3', 'description': 'First text item in Byline (Standard text item)',
            'secondary': 'Second text item in Byline (Can be semantic (Status) or not)',
            'routerLink': '#'
        }];
}
