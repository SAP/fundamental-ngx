import { Component } from '@angular/core';
import { ModifyItemEvent } from '@fundamental-ngx/platform';

export interface Name {
    title: string;
}
export interface Counter {
    title: string;
    counter: string;
}
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

    items: Name[] = [
        { 'title': 'Item1' },
        { 'title': 'Item2' },
        { 'title': 'Item3' }];
}

@Component({
    selector: 'fdp-list-with-item-counter-example',
    templateUrl: './platform-list-with-item-counter-example.component.html'
})
export class PlatformListWithItemCounterExampleComponent {

    items: Counter[] = [
        { 'title': 'Item1', 'counter': '2134' },
        { 'title': 'Item2', 'counter': '34562' },
        { 'title': 'Item3', 'counter': '739' }];
}

@Component({
    selector: 'fdp-list-with-navigation-example',
    templateUrl: './platform-list-with-navigation-example.component.html'
})
export class PlatformListWithNavigationExampleComponent {
    items: Name[] = [
        { 'title': 'Item1' },
        { 'title': 'Item2' },
        { 'title': 'Item3' }];
}

@Component({
    selector: 'fdp-list-with-buttons-example',
    templateUrl: './platform-list-with-buttons-example.component.html'
})
export class PlatformListWithButtonsExampleComponent {

    _modifyRow(event: ModifyItemEvent): void {
        const id = event.source.id;
        if (event.action === 'edit') {
            alert('Edit row --- ' + id);
        } else if (event.action === 'delete') {
            alert('Delete row ' + id);
        }
    }
}
