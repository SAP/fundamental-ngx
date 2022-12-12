import {
    AfterContentInit,
    AfterViewInit,
    Component,
    ContentChild,
    HostBinding,
    HostListener,
    Input,
    OnInit,
    QueryList,
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
export class SideNavigationComponent implements AfterContentInit, AfterViewInit, OnInit {
    /**
     * Side navigation configuration, to pass whole model object, instead of creating HTML from scratch
     */
    @Input()
    sideNavigationConfiguration: SideNavigationModel;

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
    constructor(private keyboardService: NestedListKeyboardService, private nestedListState: NestedListStateService) {
        this.keyboardService.refresh$.subscribe(() => {
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
            this.sideNavMain._setupScrollButtons();
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
    @HostListener('window:resize')
    onResize(): void {
        if (this.collapseWidth) {
            this.condensed = window.innerWidth <= this.collapseWidth;
        }
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
