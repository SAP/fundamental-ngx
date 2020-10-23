import { Component } from '@angular/core';

import { ActionChangeEvent } from '@fundamental-ngx/platform';

export interface Action {
    title: string;
}
@Component({
    selector: 'fdp-borderless-action-list-item-example',
    templateUrl: './platform-borderless-action-list-item-example.component.html'
})
export class PlatformActionListItemBorderLessExampleComponent {
    items: Action[] = [
        { 'title': 'Action 1' },
        { 'title': 'Action 2' },
        { 'title': 'Action 3' },
        { 'title': 'Action 4' }];

    _actionedRow($event: ActionChangeEvent): void {
        alert('invoked :' + $event.source.button.nativeElement.getAttribute('title'));
    }

}
