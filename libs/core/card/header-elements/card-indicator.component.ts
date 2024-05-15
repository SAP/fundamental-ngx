import { Component } from '@angular/core';

@Component({
    selector: 'fd-card-indicator',
    template: `<ng-content select="[fd-card-indicator-title]"></ng-content>
        <ng-content select="[fd-card-indicator-value]"></ng-content>`,
    standalone: true,
    host: {
        class: 'fd-card__indicator'
    }
})
export class CardIndicatorComponent {}
