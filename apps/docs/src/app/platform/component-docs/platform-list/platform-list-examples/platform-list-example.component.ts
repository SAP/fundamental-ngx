import { Component } from '@angular/core';

@Component({
    selector: 'fdp-list-example',
    templateUrl: './platform-list-example.component.html'
})
export class PlatformListExampleComponent { }

@Component({
    selector: 'fdp-list-with-footer-example',
    templateUrl: './platform-list-with-footer-example.component.html'
})
export class PlatformListWithFooterExampleComponent {

    items: any[] = [
        { 'title': 'Item1' },
        { 'title': 'Item2' },
        { 'title': 'Item3' }];
}

@Component({
    selector: 'fdp-list-with-item-counter-example',
    templateUrl: './platform-list-with-item-counter-example.component.html'
})
export class PlatformListWithItemCounterExampleComponent {

    items: any[] = [
        { 'title': 'Item1', 'counter': '2134' },
        { 'title': 'Item2', 'counter': '34562' },
        { 'title': 'Item3', 'counter': '739' }];
}

@Component({
    selector: 'fdp-list-with-single-selection-example',
    templateUrl: './platform-list-with-single-selection-example.component.html'
})
export class PlatformListWithSingleSelectionExampleComponent {
    selectedItems: any[] = [];
    radioItems: any[] = [
        { 'title': 'Item1', 'name': 'singleSelect' },
        { 'title': 'Item2', 'name': 'singleSelect' },
        { 'title': 'Item3', 'name': 'singleSelect' },
        { 'title': 'Item4', 'name': 'singleSelect' }];

    showItemInfo(event: any): void {
        this.selectedItems = event[0].id;
    }

}

@Component({
    selector: 'fdp-list-with-navigation-example',
    templateUrl: './platform-list-with-navigation-example.component.html'
})
export class PlatformListWithNavigationExampleComponent {
    items: any[] = [
        { 'title': 'Item1' },
        { 'title': 'Item2' },
        { 'title': 'Item3', 'href': '.' }];
}

@Component({
    selector: 'fdp-list-with-buttons-example',
    templateUrl: './platform-list-with-buttons-example.component.html'
})
export class PlatformListWithButtonsExampleComponent { }
