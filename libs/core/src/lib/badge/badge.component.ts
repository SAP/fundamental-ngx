import { Component } from '@angular/core';

@Component({
    selector: 'fd-badge',
    template: `<div class="fd-badge"><ng-content></ng-content></div>`,
    styleUrls: ['./badge.component.scss']
})
export class BadgeComponent {}
