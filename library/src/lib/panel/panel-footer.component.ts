import { Component, HostBinding } from '@angular/core';

@Component({
    selector: 'fd-panel-footer',
    templateUrl: './panel-footer.component.html'
})
export class PanelFooterComponent {
    @HostBinding('class.fd-panel__footer') true;
}
