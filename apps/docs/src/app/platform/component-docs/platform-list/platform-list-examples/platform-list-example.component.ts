import { Component, HostListener } from '@angular/core';

@Component({
    selector: 'fdp-list-example',
    templateUrl: './platform-list-example.component.html'
})
export class PlatformListExampleComponent { }

@Component({
    selector: 'fdp-list-with-nodata-example',
    templateUrl: './platform-list-with-nodata-example.component.html'
})
export class PlatformListWithNoDataExampleComponent { }


@Component({
    selector: 'fdp-list-with-unread-example',
    templateUrl: './platform-list-with-unread-example.component.html'
})
export class PlatformListWithUnReadExampleComponent { }

@Component({
    selector: 'fdp-list-with-no-seperator-example',
    templateUrl: './platform-list-with-no-seperator-example.component.html'
})
export class PlatformListWithNoSeperatorExampleComponent { }

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
    selector: 'fdp-list-with-navigation-example',
    templateUrl: './platform-list-with-navigation-example.component.html'
})
export class PlatformListWithNavigationExampleComponent {
    items: any[] = [
        { 'title': 'Item1' },
        { 'title': 'Item2' },
        { 'title': 'Item3' }];
}

@Component({
    selector: 'fdp-list-with-buttons-example',
    templateUrl: './platform-list-with-buttons-example.component.html'
})
export class PlatformListWithButtonsExampleComponent {

    // Handle deletion of item via  mouseclick
    @HostListener('click', ['$event'])
    accept(event: any): void {
        if (event.target.tagName.toLowerCase() === 'button') {
            const message = event.target.classList.contains('sap-icon--edit') ? 'Requested for Edit' : 'Accepted';
            alert(message);
        }
    }
    // Handle deletion of item via keyboard 'Enter' or mouseclick
    @HostListener('keyup', ['$event']) onKeydown(event: any): void {
        if (event && event.key === 'Enter' && event.target.tagName.toLowerCase() === 'button') {
            const msg = event.target.classList.contains('sap-icon--edit') ? 'Requested for Edit' : 'Accepted';
            alert(msg);
        }
    }
}
