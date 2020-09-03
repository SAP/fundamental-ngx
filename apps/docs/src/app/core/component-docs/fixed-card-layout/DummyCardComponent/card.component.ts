import { Component, Input } from '@angular/core';

@Component({
    selector: 'fd-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss']
})
export class CardComponent {
    @Input()
    header: string;
}
