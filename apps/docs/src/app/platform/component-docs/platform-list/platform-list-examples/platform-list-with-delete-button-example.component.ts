import { Component } from '@angular/core';

import { ModifyItemEvent } from '@fundamental-ngx/platform';

@Component({
    selector: 'fdp-list-with-delete-button-example',
    templateUrl: './platform-list-with-delete-button-example.component.html'
})
export class PlatformListWithDeleteButtonExampleComponent {

    _deleteRow(event: ModifyItemEvent): void {
        event.source.itemEl.nativeElement.style.display = 'none';
    }
}
