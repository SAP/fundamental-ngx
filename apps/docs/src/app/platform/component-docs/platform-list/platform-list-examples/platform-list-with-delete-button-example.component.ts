import { Component } from '@angular/core';

import { ModifyItemEvent } from '@fundamental-ngx/platform/list';

@Component({
    selector: 'fdp-platform-list-with-delete-button-example',
    templateUrl: './platform-list-with-delete-button-example.component.html'
})
export class PlatformListWithDeleteButtonExampleComponent {

    _deleteRow(event: ModifyItemEvent): void {
        event.source.itemEl.nativeElement.style.display = 'none';
    }
}
