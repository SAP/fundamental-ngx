import { Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'fd-docs-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {

    @Output()
    btnClicked: EventEmitter<undefined> = new EventEmitter<undefined>();

}
