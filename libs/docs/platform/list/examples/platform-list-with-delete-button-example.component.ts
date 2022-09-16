import { Component } from '@angular/core';

import { ModifyItemEvent } from '@fundamental-ngx/platform/list';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
    selector: 'fdp-platform-list-with-delete-button-example',
    templateUrl: './platform-list-with-delete-button-example.component.html'
})
export class PlatformListWithDeleteButtonExampleComponent {
    constructor(private _liveAnnouncer: LiveAnnouncer) {}

    _deleteRow(event: ModifyItemEvent): void {
        event.source.itemEl.nativeElement.style.display = 'none';
        this._liveAnnouncer.announce(`${event.source.title} item deleted`);
    }
}
