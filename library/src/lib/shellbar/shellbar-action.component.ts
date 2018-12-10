import { Component, Input } from '@angular/core';

@Component({
    selector: 'fd-shellbar-action',
    templateUrl: './shellbar-action.component.html'
})
export class ShellbarActionComponent {

    @Input()
    showAlways: boolean = false;

    @Input()
    collapsible: boolean = false;

    @Input()
    collapse: boolean = false;

}
