import {
    AfterContentInit,
    ChangeDetectionStrategy,
    Component,
    ContentChild,
    HostBinding,
    Input,
    OnInit,
    QueryList,
    ViewChildren,
    ViewEncapsulation
} from '@angular/core';
import { NestedListDirective } from '../nested-list/nested-list/nested-list.directive';
import { NestedListKeyboardService } from '../nested-list/nested-list-keyboard.service';
import { SideNavigationUtilityDirective } from './side-navigation-utility.directive';
import { SideNavigationMainDirective } from './side-navigation-main.directive';
import { SideNavigationModel } from './side-navigation-model';
import { PreparedNestedListComponent } from '../nested-list/prepared-nested-list/prepared-nested-list.component';
import { NestedListStateService } from '../nested-list/nested-list-state.service';

/**
 * The side-navigation is a wrapping component representing
 * a left navigation that can always display or expand/collapse using the menu icon within the global navigation.
 */
@Component({
    templateUrl: './side-navigation.component.html',
    selector: 'fd-side-nav',
    styleUrls: ['side-navigation.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [ NestedListKeyboardService, NestedListStateService ]
})
export class SideNavigationComponent implements AfterContentInit, OnInit {

    /**
     * Side navigation configuration, to pass whole model object, instead of creating HTML from scratch
     */
    @Input()
    sideNavigationConfiguration: SideNavigationModel;

    /** Whether condensed mode is included */
    @Input()
    @HostBinding('class.fd-side-nav--condensed')
    condensed: boolean = false;

    /** @hidden */
    @ContentChild(SideNavigationUtilityDirective, { static: false })
    sideNavUtility: SideNavigationUtilityDirective;

    /** @hidden */
    @ContentChild(SideNavigationMainDirective, { static: false })
    sideNavMain: SideNavigationMainDirective;

    @ViewChildren(PreparedNestedListComponent)
    preparedNestedList: QueryList<PreparedNestedListComponent>;

    /** @hidden */
    constructor(
        private keyboardService: NestedListKeyboardService,
        private nestedListState: NestedListStateService
    ) {
        this.keyboardService.refresh$.subscribe(() =>
            /** Refresh list of elements, that are being supported by keyboard */
            this.keyboardService.refreshItems(this.getLists())
        );
    }

    /** @hidden */
    ngOnInit(): void {
        /** Set up condensed state */
        this.nestedListState.condensed = this.condensed ||
            (this.sideNavigationConfiguration && this.sideNavigationConfiguration.condensed)
        ;
    }

    /** @hidden */
    ngAfterContentInit(): void {
        this.keyboardService.refreshItems(this.getLists());
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
            lists.push(...this.preparedNestedList.map(preparedNested => preparedNested.nestedListDirective));
        }

        return lists;
    }
}
