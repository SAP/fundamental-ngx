import { AfterContentInit, Component, ContentChild, forwardRef, HostBinding, HostListener, Input } from '@angular/core';
import { IconComponent } from '@fundamental-ngx/core/icon';
import { ListComponent } from '../list.component';
import { ListNavigationItemArrowDirective } from '../directives/list-navigation-item-arrow.directive';
import { ListNavigationItemTextDirective } from '../directives/list-navigation-item-text.directive';

@Component({
    // tslint:disable-next-line:component-selector
    selector: '[fd-list-navigation-item], [fdListNavigaitonItem]',
    templateUrl: './list-navigation-item.component.html',
    styleUrls: ['./list-navigation-item.component.scss']
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
    @ContentChild(forwardRef(() => ListComponent))
    _listComponent: ListComponent;

    /** @hidden */
    @ContentChild(ListNavigationItemArrowDirective)
    _listNavigationItemArrow: ListNavigationItemArrowDirective;

    /** @hidden */
    @ContentChild(IconComponent)
    _iconComponent: IconComponent;

    /** @hidden */
    @ContentChild(ListNavigationItemTextDirective)
    _text: ListNavigationItemTextDirective;

    /** @hidden */
    _innerText: string;

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
        this._innerText = this._text.elementRef.nativeElement.innerText;
    }

    /** @hidden */
    @HostListener('click', ['$event'])
    onItemClick(event: MouseEvent): void {
        event.stopPropagation();
        this._handleExpandedChanges(!this.expanded);
    }

    /** @hidden */
    _childIndicatedAndCollapsed(): boolean {
        let retVal = false;
        this._listComponent?._navItems?.forEach((navItem) => {
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
