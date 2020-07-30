import { Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'fd-badge',
    template: `<div class="fd-badge"><ng-content></ng-content></div>`,
    styleUrls: ['./badge.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class BadgeComponent {}
