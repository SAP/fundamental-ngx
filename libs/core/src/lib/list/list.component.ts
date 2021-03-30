import {
    AfterContentInit,
    ChangeDetectionStrategy,
    Component,
    ContentChildren,
    EventEmitter,
    HostBinding,
    HostListener,
    Input,
    OnDestroy,
    OnInit,
    Output,
    QueryList,
    ViewEncapsulation
} from '@angular/core';
import { ListItemComponent } from './list-item/list-item.component';
import { merge, Subject } from 'rxjs';
import { startWith, takeUntil } from 'rxjs/operators';
import {
    FocusEscapeDirection,
    KeyboardSupportService
} from '../utils/services/keyboard-support/keyboard-support.service';
import { ListGroupHeaderDirective } from './directives/list-group-header.directive';
import { ListFocusItem } from './list-focus-item.model';

type FocusItem = ListGroupHeaderDirective | ListItemComponent;
/**
 * The directive that represents a list.
 * It is used to display a list of items with simple information such as scopes, names, etc.
 */
@Component({
    // tslint:disable-next-line:component-selector
    selector: '[fd-list], [fdList]',
    templateUrl: `./list.component.html`,
    host: {
        class: 'fd-list',
        role: 'list',
        tabindex: '0'
    },
    styleUrls: [
        './list.component.scss',
        '../utils/drag-and-drop/drag-and-drop.scss'
    ],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        KeyboardSupportService
    ]
})
export class ListComponent implements OnInit, AfterContentInit, OnDestroy {
    /** Whether dropdown mode is included to component, used for Select and Combobox */
    @Input()
    @HostBinding('class.fd-list--dropdown')
    dropdownMode = false;

    /** Whether multi mode is included to component, used for MultiInput */
    @Input()
    @HostBinding('class.fd-list--multi-input')
    multiInputMode = false;

    /** Whether list is used in mobile mode*/
    @Input()
    @HostBinding('class.fd-list--mobile')
    mobileMode = false;

    /** Whether compact mode is included to component */
    @Input()
    @HostBinding('class.fd-list--compact')
    compact = false;

    /** Whether list component contains message */
    @Input()
    @HostBinding('class.fd-list--has-message')
    hasMessage = false;

    /** Whether list component has removed borders */
    @Input()
    @HostBinding('class.fd-list--no-border')
    noBorder = false;

    /** Whether list component has navigation indicators */
    @Input()
    @HostBinding('class.fd-list--navigation-indication')
    navigationIndicator = false;

    /** Whether list component has checkboxes or radio buttons included */
    @Input()
    @HostBinding('class.fd-list--selection')
    selection = false;

    /** Whether internal keyboard support should be enabled. It's enabled by default */
    @Input()
    keyboardSupport = true;

    /** Whether list should have a byline */
    @Input()
    @HostBinding('class.fd-list--byline')
    byline = false;

    /** Event thrown, when focus escapes the list */
    @Output()
    focusEscapeList = new EventEmitter<FocusEscapeDirection>();

    /** Whether list component includes links */
    @HostBinding('class.fd-list--navigation')
    hasNavigation = false;

    /** @hidden */
    @ContentChildren(ListItemComponent)
    items: QueryList<ListItemComponent>;

    /** @hidden */
    @ContentChildren(ListFocusItem)
    private _focusItems: QueryList<FocusItem>;

    /** An RxJS Subject that will kill the data stream upon queryList changes (for unsubscribing)  */
    private readonly _onRefresh$: Subject<void> = new Subject<void>();

    /** An RxJS Subject that will kill the data stream upon component’s destruction (for unsubscribing)  */
    private readonly _onDestroy$: Subject<void> = new Subject<void>();

    /** @hidden */
    constructor(private _keyboardSupportService: KeyboardSupportService<FocusItem>) { }

    /** @hidden */
    ngOnInit(): void {
        this._listenOnListFocusEscape();
    }

    /** @hidden */
    ngAfterContentInit(): void {
        this._keyboardSupportService.setKeyboardService(this._focusItems, false);
        this._listenOnQueryChange();
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._onDestroy$.next();
        this._onDestroy$.complete();
    }

    /** @hidden */
    @HostListener('keydown', ['$event'])
    keyDownHandler(event: KeyboardEvent): void {
        if (this.keyboardSupport) {
            this._keyboardSupportService.onKeyDown(event)
        }
    }

    /** Set fake focus on element with passed index */
    setItemActive(index: number): void {
        this._keyboardSupportService.keyManager.setActiveItem(index);
    }

    /** @hidden */
    private _listenOnQueryChange(): void {
        this.items.changes
            .pipe(
                startWith(0),
                takeUntil(this._onDestroy$)
            )
            .subscribe(() => {
                this._recheckLinks();
                this._listenOnItemsClick();
            });
    }

    /** @hidden */
    private _listenOnItemsClick(): void {
        /** Finish all of the streams, from before */
        this._onRefresh$.next();
        /** Merge refresh/destroy observables */
        const refreshObs = merge(this._onRefresh$, this._onDestroy$);
        this._focusItems.forEach(
            (item, index) => item.clicked
                .pipe(takeUntil(refreshObs))
                .subscribe(() => this.setItemActive(index))
        );
    }

    /** @hidden */
    private _recheckLinks(): void {
        const items = this.items.filter(item => item.link);
        this.hasNavigation = items.length > 0;
    }

    /** @hidden */
    private _listenOnListFocusEscape(): void {
        this._keyboardSupportService.focusEscapeList
            .pipe(takeUntil(this._onDestroy$))
            .subscribe(direction => this.focusEscapeList.emit(direction))
    }
}
