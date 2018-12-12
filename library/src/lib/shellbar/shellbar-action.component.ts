import { Component, Input } from '@angular/core';

@Component({
    selector: 'fd-shellbar-action',
    templateUrl: './shellbar-action.component.html'
})
export class ShellbarActionComponent {

    @Input()
    glyph: string;

    @Input()
    callback: Function;

    @Input()
    label: string;

    @Input()
    notificationLabel: string;

    @Input()
    notificationCount: number;

}
