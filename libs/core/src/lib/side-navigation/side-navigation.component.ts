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
import { NestedListDirective } from '@fundamental-ngx/core/nested-list';
import { NestedListKeyboardService } from '@fundamental-ngx/core/nested-list';
import { SideNavigationUtilityDirective } from './side-navigation-utility.directive';
import { SideNavigationMainDirective } from './side-navigation-main.directive';
import { SideNavigationModel } from './side-navigation-model';
import { PreparedNestedListComponent } from '@fundamental-ngx/core/nested-list';
import { NestedListStateService } from '@fundamental-ngx/core/nested-list';
import { Nullable } from '@fundamental-ngx/cdk/utils';
import { SideNavigationInterface } from './side-navigation.interface';
import deprecated from "deprecated-decorator";

/**
 * @deprecated use the vertical navigation component instead.
 * The side-navigation is a wrapping component representing
 * a left navigation that can always display or expand/collapse using the menu icon within the global navigation.
 */
@deprecated({
    alternative: 'VerticalNavigationComponent',
    url: 'https://github.com/SAP/fundamental-ngx/tree/75130aa85724060a515d99d675eb672b6d6eef6a/libs/core/src/lib/vertical-navigation'
})
@Component({
    templateUrl: './side-navigation.component.html',
    selector: 'fd-side-nav',
    styleUrls: ['side-navigation.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [NestedListKeyboardService, NestedListStateService]
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
