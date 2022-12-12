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
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { NestedListComponent } from '@fundamental-ngx/cx/nested-list';
import { InputGroupComponent } from '@fundamental-ngx/core/input-group';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'fdx-side-nav-main, div[fdx-side-nav-main]',
    templateUrl: './side-navigation-main.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SideNavigationMainComponent implements AfterContentInit {
    /** @hidden */
    @ContentChild(NestedListComponent)
    list: NestedListComponent;

    /** @hidden */
    @ContentChildren(InputGroupComponent, { descendants: true })
    _inputGroups: QueryList<InputGroupComponent>;

    /** @hidden */
    @ViewChild('scrollDownButton', { read: ElementRef })
    _scrollDownButton: ElementRef;

    /** @hidden */
    @HostBinding('class.fdx-side-nav__main-navigation')
    classSideNavMainNavigation = true;

    /** @hidden */
    _showScrollUpButton = false;

    /** @hidden */
    _showScrollDownButton = false;

    /** @hidden */
    constructor(private _elementRef: ElementRef, private _cdRef: ChangeDetectorRef) {}

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

    /** @hidden */
    _setupScrollButtons(): void {
        setTimeout(() => {
            if (this._elementRef.nativeElement.scrollHeight > this._elementRef.nativeElement.clientHeight) {
                this._elementRef.nativeElement.style.overflowY = 'hidden';
                this._showScrollUpButton = true;
                this._showScrollDownButton = true;
                this._cdRef.detectChanges();
            }
        });
    }

    /** @hidden */
    _scrollItems(direction: 'up' | 'down'): void {
        this.elementRef.nativeElement.scrollBy({ top: direction === 'up' ? -54 : 54, left: 0, behavior: 'smooth' });
    }
}
