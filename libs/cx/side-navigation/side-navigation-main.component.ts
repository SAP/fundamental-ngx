import {
    AfterContentInit,
    ChangeDetectorRef,
    ContentChild,
    ContentChildren,
    Directive,
    ElementRef,
    HostBinding,
    QueryList
} from '@angular/core';
import { InputGroupComponent } from '@fundamental-ngx/core/input-group';
import { NestedListComponent } from '@fundamental-ngx/cx/nested-list';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: 'fdx-side-nav-main, div[fdx-side-nav-main]'
})
// eslint-disable-next-line @angular-eslint/directive-class-suffix
export class SideNavigationMainComponent implements AfterContentInit {
    /** @hidden */
    @ContentChild(NestedListComponent)
    list: NestedListComponent;

    /** @hidden */
    @ContentChildren(InputGroupComponent, { descendants: true })
    _inputGroups: QueryList<InputGroupComponent>;

    /** @hidden */
    @HostBinding('class.fdx-side-nav__main-navigation')
    classSideNavMainNavigation = true;

    /** @hidden */
    constructor(
        private _elementRef: ElementRef,
        private _cdRef: ChangeDetectorRef
    ) {}

    /** @hidden */
    get elementRef(): ElementRef<HTMLElement> {
        return this._elementRef;
    }

    /** @hidden */
    ngAfterContentInit(): void {
        this._inputGroups.forEach((input) => {
            input.elementRef.nativeElement.classList.add('fdx-side-nav__input-group');
        });
    }
}
