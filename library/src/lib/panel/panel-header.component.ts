import { Component, HostBinding } from '@angular/core';
@Component({
    selector: 'fd-panel-header',
    templateUrl: './panel-header.component.html'
})
export class PanelHeaderComponent {
    @HostBinding('class.fd-panel__header') true;
}
