import { Component } from '@angular/core';

import { ActionChangeEvent } from '@fundamental-ngx/platform/list';

import { ActionListItemModule, PlatformListModule } from '@fundamental-ngx/platform/list';

export interface Action {
    title: string;
}

@Component({
    selector: 'fdp-platform-action-list-item-example',
    templateUrl: './platform-action-list-item-example.component.html',
    imports: [PlatformListModule, ActionListItemModule]
})
export class PlatformActionListItemExampleComponent {
    items: Action[] = [{ title: 'Action 1' }, { title: 'Action 2' }, { title: 'Action 3' }, { title: 'Action 4' }];

    _actionedRow($event: ActionChangeEvent): void {
        alert('invoked :' + $event.source.button.nativeElement.getAttribute('title'));
    }
}
