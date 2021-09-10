import { AfterContentInit, ContentChild, Directive, HostBinding, HostListener, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ListComponent } from '../list.component';
import { ListNavigationItemArrowDirective } from './list-navigation-item-arrow.directive';
import { IconComponent } from '@fundamental-ngx/core/icon';

@Directive({
    selector: '[fd-list-navigation-item], [fdListNavigaitonItem]'
})
export class ListNavigationItemDirective implements AfterContentInit, OnChanges {
    /** Whether or not the list item is expanded. */
    @Input()
    @HostBinding('class.is-expanded')
    expanded = false;

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
    ngOnChanges(changes: SimpleChanges): void {
        if (changes && changes.expanded) {
            this._handleExpandedChanges(changes.expanded.currentValue);
        }
    }

    /** @hidden */
    @HostListener('click', ['$event'])
    onItemClick(event): void {
        event.stopPropagation();
        this._handleExpandedChanges(!this.expanded);
    }

    /** @hidden */
    private _handleExpandedChanges(expanded: boolean): void {
        if (this._isExpandable) {
            this.expanded = expanded;
            this._listNavigationItemArrow._setExpanded(this.expanded);
        }
    }
}
