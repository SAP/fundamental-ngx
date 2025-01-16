import { Component } from '@angular/core';

import { LiveAnnouncer } from '@angular/cdk/a11y';
import { ModifyItemEvent, PlatformListModule, StandardListItemModule } from '@fundamental-ngx/platform/list';

@Component({
    selector: 'fdp-platform-list-with-delete-button-example',
    templateUrl: './platform-list-with-delete-button-example.component.html',
    imports: [PlatformListModule, StandardListItemModule]
})
export class PlatformListWithDeleteButtonExampleComponent {
    constructor(private _liveAnnouncer: LiveAnnouncer) {}

    _deleteRow(event: ModifyItemEvent): void {
        event.source.itemEl.nativeElement.style.display = 'none';
        this._liveAnnouncer.announce(`${event.source.title} item deleted`);
    }
}
