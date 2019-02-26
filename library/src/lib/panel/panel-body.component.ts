import { Component, HostBinding, Input } from '@angular/core';

@Component({
    selector: 'fd-panel-body',
    templateUrl: './panel-body.component.html',
    host: {
        class: 'fd-panel__body'
    },
    styles: [':host {display: block;}']
})
export class PanelBodyComponent {

    @Input()
    @HostBinding('class.fd-panel__body--bleed')
    bleed: boolean;

}
