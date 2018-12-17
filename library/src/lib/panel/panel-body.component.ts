import { Component, Input } from '@angular/core';

@Component({
    selector: 'fd-panel-body',
    templateUrl: './panel-body.component.html'
})
export class PanelBodyComponent {

  @Input() bleed: boolean;

}
