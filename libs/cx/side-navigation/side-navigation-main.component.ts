import {
    AfterContentInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChild,
    ContentChildren,
    ElementRef,
    HostBinding,
    QueryList,
    ViewEncapsulation
} from '@angular/core';
import { InputGroupComponent } from '@fundamental-ngx/core/input-group';
import { NestedListComponent } from '@fundamental-ngx/cx/nested-list';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'fdx-side-nav-main, div[fdx-side-nav-main]',
    template: `<ng-content></ng-content>`,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SideNavigationMainComponent implements AfterContentInit {
    /** @ignore */
    @ContentChild(NestedListComponent)
    list: NestedListComponent;

    /** @ignore */
    @ContentChildren(InputGroupComponent, { descendants: true })
    _inputGroups: QueryList<InputGroupComponent>;

    /** @ignore */
    @HostBinding('class.fdx-side-nav__main-navigation')
    classSideNavMainNavigation = true;

    /** @ignore */
    constructor(
        private _elementRef: ElementRef,
        private _cdRef: ChangeDetectorRef
    ) {}

    /** @ignore */
    get elementRef(): ElementRef<HTMLElement> {
        return this._elementRef;
    }

    /** @ignore */
    ngAfterContentInit(): void {
        this._inputGroups.forEach((input) => {
            input.elementRef.nativeElement.classList.add('fdx-side-nav__input-group');
        });
    }
}
