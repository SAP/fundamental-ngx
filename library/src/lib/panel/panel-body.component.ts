import { Component, HostBinding, Input } from '@angular/core';

@Component({
    selector: 'fd-panel-body',
    templateUrl: './panel-body.component.html',
    styles: [':host {display: block;}']
})
export class PanelBodyComponent {

    @HostBinding('class.fd-panel__body') true;

    @Input()
    @HostBinding('class.fd-panel__body--bleed')
    bleed: boolean;

}
