import { Component, HostBinding } from '@angular/core';

@Component({
    selector: 'fd-panel-actions',
    templateUrl: './panel-actions.component.html'
})
export class PanelActionsComponent {
    @HostBinding('class.fd-panel__actions') true;
}
