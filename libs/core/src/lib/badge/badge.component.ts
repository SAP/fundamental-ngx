import {
    Component,
    HostBinding,
    ViewEncapsulation
} from '@angular/core';

@Component({
    // tslint:disable-next-line:component-selector
    selector: '[fd-badge]',
    template: `<ng-content></ng-content>`,
    styleUrls: ['./badge.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class BadgeComponent {
    /** @hidden */
    @HostBinding('class.fd-badge')
    baseClass = true;
}
