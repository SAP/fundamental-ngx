import {
    AfterContentInit,
    ContentChildren,
    Directive,
    HostBinding,
    OnDestroy,
    QueryList
} from '@angular/core';
import { MegaMenuItemComponent } from '../mega-menu-item/mega-menu-item.component';
import { merge, Subject } from 'rxjs';
import { startWith, takeUntil } from 'rxjs/operators';
import { MenuKeyboardService } from '../../menu/menu-keyboard.service';

/**
 *  Directive represents mega menu list, which contains items.
 *  ```html
 *  <ul fd-mega-menu-list>
 *      <fd-mega-menu-item>
 *          <a fd-mega-menu-link>Item 0</a>
 *          <li fd-mega-menu-subitem>
 *              <a fd-mega-menu-sublink>Sub Item 1</a>
 *          </li>
 *          <li fd-mega-menu-subitem>
 *              <a fd-mega-menu-sublink>Sub Item 2</a>
 *          </li>
 *          <li fd-mega-menu-subitem>
 *              <a fd-mega-menu-sublink>Sub Item 3</a>
 *          </li>
 *      </fd-mega-menu-item>
 *  </ul>
 *  ```
 * */
@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[fd-mega-menu-list]'
})
export class MegaMenuListDirective implements AfterContentInit, OnDestroy {

    /** @hidden */
    @HostBinding('class.fd-mega-menu__list')
    fdMegaMenuClass: boolean = true;

    /** @hidden */
    @ContentChildren(MegaMenuItemComponent)
    items: QueryList<MegaMenuItemComponent>;

    /** An RxJS Subject that will kill the data stream upon component’s destruction (for unsubscribing)  */
    private readonly onDestroy$: Subject<void> = new Subject<void>();

    /** An RxJS Subject that will kill the data stream upon queryList changes (for unsubscribing)  */
    private readonly onRefresh$: Subject<void> = new Subject<void>();

    /** @hidden */
    constructor(
        private menuKeyboardService: MenuKeyboardService,
    ) {}

    /** @hidden */
    ngAfterContentInit(): void {
        this.items.changes
            .pipe(takeUntil(this.onDestroy$), startWith(5))
            .subscribe(() => this.refreshSubscription())
        ;
    }

    /** Method that provides handles keydown events from menu item list */
    handleListKeyDown(event: KeyboardEvent, index: number): void {
        this.menuKeyboardService.keyDownHandler(event, index, this.items.toArray());
    }

    /** @hidden */
    ngOnDestroy(): void {
        this.onDestroy$.next();
        this.onDestroy$.complete();
    }

    /** Whether any querylist detects any changes */
    private refreshSubscription(): void {
        /** Finish all of the streams, form before */
        this.onRefresh$.next();

        /** Merge refresh/destroy observables */
        const refreshObs = merge(this.onRefresh$, this.onDestroy$);

        /** New subscription streams */
        this.items.forEach((item: MegaMenuItemComponent, index: number) => item.keyDown
            .pipe(takeUntil(refreshObs))
            .subscribe((keyboardEvent: KeyboardEvent) => this.handleListKeyDown(keyboardEvent, index)))
        ;
    }
}
