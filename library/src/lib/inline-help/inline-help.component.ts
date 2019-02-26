import { Component, Input } from '@angular/core';

@Component({
    selector: 'fd-inline-help',
    templateUrl: './inline-help.component.html',
    host: {
        class: 'fd-inline-help',
        role: 'alert'
    }
})
export class InlineHelpComponent {
    @Input()
    position: string;
}
