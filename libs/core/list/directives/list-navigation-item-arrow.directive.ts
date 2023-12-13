import { Directive, HostBinding, Input } from '@angular/core';
import { Nullable } from '@fundamental-ngx/cdk/utils';

@Directive({
    selector: '[fd-list-navigation-item-arrow], [fdListNavigaitonItemArrow]',
    host: {
        tabindex: '-1',
        role: 'presentation'
    },
    standalone: true
})
export class ListNavigationItemArrowDirective {
    /** @ignore */
    @HostBinding('class.fd-list__navigation-item-arrow')
    navigationItemArrowClass = true;

    /** @ignore */
    @HostBinding('class.sap-icon--navigation-right-arrow')
    rightArrowClass = true;

    /** @ignore */
    @HostBinding('class.sap-icon--navigation-down-arrow')
    downArrowClass = false;

    /** @ignore */
    @HostBinding('class.is-expanded')
    expanded = false;

    /** Aria-hidden attribute value. */
    @Input()
    @HostBinding('attr.aria-hidden')
    ariaHidden: Nullable<boolean> = true;

    /** @ignore */
    _setExpanded(expanded: boolean): void {
        if (this.expanded !== expanded) {
            this.rightArrowClass = !this.rightArrowClass;
            this.downArrowClass = !this.downArrowClass;
        }
        this.expanded = expanded;
    }
}
