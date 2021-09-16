import {
    AfterContentInit,
    Component,
    ContentChild,
    HostBinding,
    HostListener,
    Input
} from '@angular/core';
import { ListComponent } from '../list.component';
import { ListNavigationItemArrowDirective } from './list-navigation-item-arrow.directive';
import { IconComponent } from '@fundamental-ngx/core/icon';

@Component({
    // tslint:disable-next-line:component-selector
    selector: '[fd-list-navigation-item], [fdListNavigaitonItem]',
    template: '<ng-content></ng-content><span *ngIf="indicated || _childIndicatedAndCollapsed()" class="fd-list__navigation-item-indicator"></span>'
})
export class ListNavigationItemComponent implements AfterContentInit {
    /** Whether or not the list item is expanded. */
    @Input()
    @HostBinding('class.is-expanded')
    expanded = false;

    /** Whether or not this list item is indicated for navigation. */
    @Input()
    @HostBinding('class.fd-list__navigation-item--indicated')
    indicated = false;

    /** @hidden */
    @HostBinding('class.fd-list__navigation-item')
    _navigationItemClass = true;

    /** @hidden */
    @HostBinding('class.fd-list__navigation-item--expandable')
    _isExpandable = false;

    /** @hidden */
    @HostBinding('attr.tabindex')
    _tabIndex;

    /** @hidden */
    @HostBinding('class.fd-list__navigation-item--condensed')
    _condensed = false;

    /** @hidden */
    @ContentChild(ListComponent)
    _listComponent: ListComponent;

    /** @hidden */
    @ContentChild(ListNavigationItemArrowDirective)
    _listNavigationItemArrow: ListNavigationItemArrowDirective;

    /** @hidden */
    @ContentChild(IconComponent)
    _iconComponent: IconComponent;

    /** @hidden */
    ngAfterContentInit(): void {
        if (this._listComponent) {
            this._isExpandable = true;
        } else {
            this._tabIndex = 0;
        }
        if (this._iconComponent) {
            this._iconComponent._navigationItemIcon = true;
        }
    }

    /** @hidden */
    @HostListener('click', ['$event'])
    onItemClick(event): void {
        event.stopPropagation();
        this._handleExpandedChanges(!this.expanded);
    }

    /** @hidden */
    _childIndicatedAndCollapsed(): boolean {
        let retVal = false;
        this._listComponent?._navItems?.forEach(navItem => {
            if (navItem.indicated && !navItem.expanded) {
                retVal = true;
            }
        });

        return retVal;
    }

    /** @hidden */
    private _handleExpandedChanges(expanded: boolean): void {
        if (this._isExpandable) {
            this.expanded = expanded;
            this._listNavigationItemArrow._setExpanded(this.expanded);
        }
    }
}
