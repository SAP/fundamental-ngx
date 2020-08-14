import {
    AfterContentInit,
    ChangeDetectionStrategy,
    Component,
    ContentChildren,
    HostBinding,
    Input, OnDestroy, Optional,
    QueryList,
    ViewEncapsulation
} from '@angular/core';
import { ListItemComponent } from './list-item/list-item.component';
import { MenuKeyboardService } from '../menu/menu-keyboard.service';
import { merge, Subject } from 'rxjs';
import { startWith, takeUntil } from 'rxjs/operators';

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
    },
    styleUrls: ['./list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent implements AfterContentInit, OnDestroy {
    /** Whether dropdown mode is included to component, used for Select and Combobox */
    @Input()
    @HostBinding('class.fd-list--dropdown')
    dropdownMode = false;

    /** Whether multi mode is included to component, used for MultiInput */
    @Input()
    @HostBinding('class.fd-list--multi-input')
    multiInputMode = false;

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

    /** Whether list component includes links */
    @Input()
    @HostBinding('class.fd-list--navigation')
    hasNavigation = false;

    /** Whether list component has navigation indicators */
    @Input()
    @HostBinding('class.fd-list--navigation-indication')
    navigationIndication = false;

    /** Whether list component has checkboxes or radio buttons included */
    @Input()
    @HostBinding('class.fd-list--selection')
    selection = false;

    /** Whether internal keyboard support should be enabled. It's enabled by default */
    @Input()
    enableKeyboardSupport = true

    /** @hidden */
    @ContentChildren(ListItemComponent)
    items: QueryList<ListItemComponent>;

    /** An RxJS Subject that will kill the data stream upon component’s destruction (for unsubscribing)  */
    private readonly _onDestroy$: Subject<void> = new Subject<void>();

    /** An RxJS Subject that will kill the data stream upon queryList changes (for unsubscribing)  */
    private readonly _onRefresh$: Subject<void> = new Subject<void>();

    /** @hidden */
    constructor(
        @Optional() private _keyboardService: MenuKeyboardService
    ) {}

    /** @hidden */
    ngAfterContentInit(): void {
        if (this.enableKeyboardSupport && this._keyboardService) {
            this.items.changes
                .pipe(
                    takeUntil(this._onDestroy$),
                    startWith(0)
                ).subscribe(() => this._refreshSubscription())
            ;
        }
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._onDestroy$.next();
        this._onDestroy$.complete();
    }

    /** @hidden */
    private _refreshSubscription(): void {
        /** Finish all of the streams, form before */
        this._onRefresh$.next();

        /** Merge refresh/destroy observables */
        const refreshObs = merge(this._onRefresh$, this._onDestroy$);

        this.items.forEach((item, index) =>
            item.keyDown
                .pipe(takeUntil(refreshObs))
                .subscribe((event: KeyboardEvent) => this._keyboardService.keyDownHandler(event, index, this.items.toArray()))
        );
    }
}
