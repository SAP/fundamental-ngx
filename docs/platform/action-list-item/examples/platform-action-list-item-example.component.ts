import { Component } from '@angular/core';

import { ActionChangeEvent } from '@fundamental-ngx/platform/list';

import { Action } from './platform-action-list-item-border-less-example.component';

@Component({
    selector: 'fdp-platform-action-list-item-example',
    templateUrl: './platform-action-list-item-example.component.html'
})
export class PlatformActionListItemExampleComponent {
    items: Action[] = [{ title: 'Action 1' }, { title: 'Action 2' }, { title: 'Action 3' }, { title: 'Action 4' }];

    _actionedRow($event: ActionChangeEvent): void {
        alert('invoked :' + $event.source.button.nativeElement.getAttribute('title'));
    }
}
