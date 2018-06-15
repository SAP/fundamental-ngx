import { Input, Component } from '@angular/core';

@Component({
    selector: 'fd-badge',
    host: {
        '[class]': '"fd-badge" + (status ? " fd-badge--" + status : "") + (modifier ? " fd-badge--" + modifier : "")'
    },
    templateUrl: './badge-label.component.html'
})
export class BadgeComponent {
    @Input() status;

    @Input() modifier;
}
