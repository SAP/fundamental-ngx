import { Component, Input } from '@angular/core';

@Component({
    selector: 'fd-inline-help',
    templateUrl: './inline-help.component.html'
})
export class InlineHelpComponent {
    @Input() position: string;
}
