import { Component, HostListener } from '@angular/core';
import { ENTER, SPACE } from '@angular/cdk/keycodes';

@Component({
    selector: 'fdp-list-example',
    templateUrl: './platform-list-example.component.html'
})
export class PlatformListExampleComponent { }

@Component({
    selector: 'fdp-list-with-delete-button-example',
    templateUrl: './platform-list-with-delete-button-example.component.html'
})
export class PlatformListWithDeleteButtonExampleComponent {
    items: any[] = [
        { 'title': 'Item1', 'secondayIcon': 'decline' },
        { 'title': 'Item2', 'secondayIcon': 'decline' },
        { 'title': 'Item3', 'secondayIcon': 'decline' },
        { 'title': 'Item4' }
    ];

    @HostListener('click', ['$event'])
    deleteRow(event: any) {
        if (event.target.parentNode.tagName.toLowerCase() === 'fdp-button') {
            event.target.parentNode.parentNode.style.display = 'none';
        }
    }

}


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
        { 'title': 'Item1', 'secondary': '2134' },
        { 'title': 'Item2', 'secondary': '34562' },
        { 'title': 'Item3', 'secondary': '739' }];
}


@Component({
    selector: 'fdp-list-with-selection-example',
    templateUrl: './platform-list-with-selection-example.component.html'
})
export class PlatformListWithSelectionExampleComponent {
    selectedItems: any[] = [];
    items: any[] = [
        { 'title': 'Item1', 'checkboxValue': 'check1' },
        { 'title': 'Item2', 'checkboxValue': 'check2' },
        { 'title': 'Item3', 'checkboxValue': 'check3' },
        { 'title': 'Item4', 'checkboxValue': 'check4' }];

    showItemInfo(event: any) {
        this.selectedItems = event;
    }

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

    showItemInfo(event: any) {
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
        { 'title': 'Item3' }];
}
