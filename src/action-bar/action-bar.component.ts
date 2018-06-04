import { Component, Input } from '@angular/core';

@Component({
    selector: 'fd-action-bar',
    templateUrl: './action-bar.component.html'
})
export class ActionBarComponent {
    @Input() actionBarTitle: string;

    @Input() isNavigation: boolean;
}
