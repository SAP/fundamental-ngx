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
import { Nullable, warnOnce } from '@fundamental-ngx/cdk/utils';
import { MenuKeyboardService } from '@fundamental-ngx/core/menu';
import {
    NestedListDirective,
    NestedListKeyboardService,
    NestedListStateService,
    PreparedNestedListComponent
} from '@fundamental-ngx/core/nested-list';
import { SideNavigationMainDirective } from './side-navigation-main.directive';
import { SideNavigationModel } from './side-navigation-model';
import { SideNavigationUtilityDirective } from './side-navigation-utility.directive';
import { SideNavigationInterface } from './side-navigation.interface';

/**
 * @deprecated use the vertical navigation component instead.
 * The side-navigation is a wrapping component representing
 * a left navigation that can always display or expand/collapse using the menu icon within the global navigation.
 */
@Component({
    templateUrl: './side-navigation.component.html',
    selector: 'fd-side-nav',
    styleUrl: './side-navigation.component.scss',
    encapsulation: ViewEncapsulation.None,
    providers: [MenuKeyboardService, NestedListKeyboardService, NestedListStateService],
    imports: [SideNavigationMainDirective, PreparedNestedListComponent, SideNavigationUtilityDirective]
})
export class SideNavigationComponent implements AfterContentInit, AfterViewInit, OnInit, SideNavigationInterface {
    /**
     * Side navigation configuration, to pass whole model object, instead of creating HTML from scratch
     */
    @Input()
    sideNavigationConfiguration: Nullable<SideNavigationModel>;

    /** Whether condensed mode is included */
    @Input()
    @HostBinding('class.fd-side-nav--condensed')
    condensed = false;

    /**
     * The screen width, in pixels, at which to automatically collapse the side navigation on window resize.
     */
    @Input()
    collapseWidth: number;

    /** Whether clicking on elements should change selected state of items */
    @Input()
    set selectable(selectable: boolean) {
        this.nestedListState.selectable = selectable;
    }

    /** @hidden */
    @ContentChild(SideNavigationUtilityDirective)
    sideNavUtility: SideNavigationUtilityDirective;

    /** @hidden */
    @ContentChild(SideNavigationMainDirective)
    sideNavMain: SideNavigationMainDirective;

    /** @hidden */
    @ViewChildren(PreparedNestedListComponent)
    preparedNestedList: QueryList<PreparedNestedListComponent>;

    /** @hidden */
    additionalShellbarCssClass = 'fd-shellbar--side-nav';

    /** @hidden */
    constructor(
        private keyboardService: NestedListKeyboardService,
        private nestedListState: NestedListStateService
    ) {
        this.keyboardService.refresh$.subscribe(() => {
            /** Refresh list of elements, that are being supported by keyboard */
            this.keyboardService.refreshItems(this.getLists());
        });
        warnOnce(`
            SideNavigationComponent is deprecated since version 0.40.0 and will be removed in future release.
            Use the vertical navigation component instead.
            For more information check the documentation.
        `);
    }

    /** @hidden */
    @HostListener('window:resize')
    onResize(): void {
        if (this.collapseWidth) {
            this.condensed = window.innerWidth <= this.collapseWidth;
        }
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
    }

    /** @hidden */
    ngAfterViewInit(): void {
        if (this.sideNavigationConfiguration) {
            this.keyboardService.refreshItems(this.getLists());
        }
    }

    /**
     * @hidden
     * Method that returns 1 deep level of lists.
     */
    private getLists(): NestedListDirective[] {
        const lists: NestedListDirective[] = [];

        if (this.sideNavMain) {
            lists.push(this.sideNavMain.list);
        }
        if (this.sideNavUtility) {
            lists.push(this.sideNavUtility.list);
        }
        if (this.preparedNestedList) {
            lists.push(...this.preparedNestedList.map((preparedNested) => preparedNested.nestedListDirective));
        }

        return lists;
    }
}
