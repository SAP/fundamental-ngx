import {
    AfterContentInit,
    ContentChildren,
    Directive,
    HostBinding,
    OnDestroy,
    QueryList
} from '@angular/core';
import { MegaMenuItemComponent } from '../mega-menu-item/mega-menu-item.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MenuKeyboardService } from '../../menu/menu-keyboard.service';

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

    /** @hidden */
    constructor(
        private menuKeyboardService: MenuKeyboardService,
    ) {}

    /** @hidden */
    ngAfterContentInit(): void {
        this.items.forEach((item: MegaMenuItemComponent, index: number) => item.keyDown
            .pipe(takeUntil(this.onDestroy$))
            .subscribe((keyboardEvent: KeyboardEvent) => this.handleListKeyDown(keyboardEvent, index)))
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
}
