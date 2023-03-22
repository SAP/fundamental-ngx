import {
    AfterContentInit,
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    ContentChild,
    ElementRef,
    HostBinding,
    HostListener,
    Input,
    OnDestroy,
    OnInit,
    QueryList,
    ViewChild,
    ViewChildren,
    ViewEncapsulation
} from '@angular/core';
import { NestedListComponent } from '@fundamental-ngx/cx/nested-list';
import { NestedListKeyboardService } from '@fundamental-ngx/cx/nested-list';
import { SideNavigationUtilityDirective } from './side-navigation-utility.directive';
import { SideNavigationMainComponent } from './side-navigation-main.component';
import { SideNavigationModel } from './side-navigation-model';
import { PreparedNestedListComponent } from '@fundamental-ngx/cx/nested-list';
import { NestedListStateService } from '@fundamental-ngx/cx/nested-list';
import { Subscription } from 'rxjs';
import { Nullable } from '@fundamental-ngx/cdk/utils';

/**
 * The side-navigation is a wrapping component representing
 * a left navigation that can always display or expand/collapse using the menu icon within the global navigation.
 */
@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'fdx-side-nav',
    templateUrl: './side-navigation.component.html',
    styleUrls: ['side-navigation.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [NestedListKeyboardService, NestedListStateService]
})
export class SideNavigationComponent implements AfterContentInit, AfterViewInit, OnInit, OnDestroy {
    /**
     * Side navigation configuration, to pass whole model object, instead of creating HTML from scratch
     */
    @Input()
    sideNavigationConfiguration: Nullable<SideNavigationModel>;

    /** Whether condensed mode is included */
    @Input()
    @HostBinding('class.fdx-side-nav--condensed')
    condensed = false;

    /** Prevents the side navigation from truncating or wrapping, extending the width to its longest label. */
    @Input()
    dynamicWidth = false;

    /**
     * The screen width, in pixels, at which to automatically collapse the side navigation on window resize.
     */
    @Input()
    collapseWidth: number;

    /**
     * Whether this side nav should display as narrow. Note this can only be used with side nav items that have icons.
     */
    @Input()
    narrow = false;

    /** Whether this side nav should display in mobile (fullscreen) mode. */
    @Input()
    mobile = false;

    /** Whether clicking on elements should change selected state of items */
    @Input()
    set selectable(selectable: boolean) {
        this.nestedListState.selectable = selectable;
    }

    /** @hidden */
    @ContentChild(SideNavigationUtilityDirective)
    sideNavUtility: SideNavigationUtilityDirective;

    /** @hidden */
    @ContentChild(SideNavigationMainComponent, { descendants: true })
    sideNavMain: SideNavigationMainComponent;

    /** @hidden */
    @ViewChildren(PreparedNestedListComponent)
    preparedNestedList: QueryList<PreparedNestedListComponent>;

    /** @hidden */
    @ViewChild('scrollDownButton', { read: ElementRef })
    _scrollDownButton: ElementRef;

    /** @hidden */
    _showScrollUpButton = false;

    /** @hidden */
    _showScrollDownButton = false;

    /** @hidden */
    private _keyboardSubscription = new Subscription();

    /** @hidden */
    constructor(
        private keyboardService: NestedListKeyboardService,
        private nestedListState: NestedListStateService,
        private _cdRef: ChangeDetectorRef
    ) {
        this._keyboardSubscription = this.keyboardService.refresh$.subscribe(() => {
            /** Refresh list of elements, that are being supported by keyboard */
            this.keyboardService.refreshItems(this.getLists());
        });
    }

    /** @hidden */
    ngOnInit(): void {
        /** Set up condensed state */
        this.nestedListState.condensed =
            this.condensed || !!(this.sideNavigationConfiguration && this.sideNavigationConfiguration.condensed);

        if (this.collapseWidth) {
            this.onResize();
        }
    }

    /** @hidden */
    ngAfterContentInit(): void {
        if (!this.sideNavigationConfiguration) {
            this.keyboardService.refreshItems(this.getLists());
        }
        if (this.sideNavMain && this.narrow) {
            this._setupScrollButtons();
            this.sideNavMain.list.nestedItems.forEach((item) => {
                item._narrow = true;
            });
        }
    }

    /** @hidden */
    ngAfterViewInit(): void {
        if (this.sideNavigationConfiguration) {
            this.keyboardService.refreshItems(this.getLists());
        }
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._keyboardSubscription?.unsubscribe();
    }

    /** @hidden */
    @HostListener('window:resize')
    onResize(): void {
        if (this.collapseWidth) {
            this.condensed = window.innerWidth <= this.collapseWidth;
        }
    }

    /** @hidden */
    _setupScrollButtons(): void {
        setTimeout(() => {
            if (
                this.sideNavMain.elementRef.nativeElement.scrollHeight >
                this.sideNavMain.elementRef.nativeElement.clientHeight
            ) {
                this.sideNavMain.elementRef.nativeElement.style.overflowY = 'hidden';
                this._showScrollUpButton = true;
                this._showScrollDownButton = true;
                this._cdRef.detectChanges();
            }
        });
    }

    /** @hidden */
    _scrollItems(direction: 'up' | 'down'): void {
        this.sideNavMain.elementRef.nativeElement.scrollBy({
            top: direction === 'up' ? -52 : 52,
            left: 0,
            behavior: 'smooth'
        });
    }

    /**
     * @hidden
     * Method that returns 1 deep level of lists.
     */
    private getLists(): NestedListComponent[] {
        const lists: NestedListComponent[] = [];

        if (this.sideNavMain) {
            lists.push(this.sideNavMain.list);
        }
        if (this.sideNavUtility) {
            lists.push(this.sideNavUtility.list);
        }
        if (this.preparedNestedList) {
            lists.push(...this.preparedNestedList.map((preparedNested) => preparedNested.nestedListComponent));
        }

        return lists;
    }
}
