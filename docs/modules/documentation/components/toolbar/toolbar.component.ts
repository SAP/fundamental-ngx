import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'fd-docs-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {

    @Input()
    showBtn: boolean;

    @Output()
    btnClicked: EventEmitter<undefined> = new EventEmitter<undefined>();

}
