import { Component, HostBinding } from '@angular/core';

@Component({
    selector: 'fd-panel-head',
    templateUrl: './panel-head.component.html'
})
export class PanelHeadComponent {
    @HostBinding('class.fd-panel__head') true;
}
