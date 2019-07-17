import {
    AfterContentInit,
    Component,
    ContentChildren, EventEmitter, HostBinding,
    Input, OnDestroy, Output, QueryList,
    ViewEncapsulation
} from '@angular/core';
import { MenuGroupComponent } from './menu-group.component';
import { MenuListDirective } from './menu-list.directive';
import { MenuItemDirective } from './menu-item.directive';
import { fromEvent, Subject, Subscription } from 'rxjs';
import { startWith, takeUntil } from 'rxjs/operators';
import { MenuKeyboardService } from './menu-keyboard.service';

/**
 * The component that represents a menu.
 */
@Component({
    selector: 'fd-menu',
    templateUrl: './menu.component.html',
    encapsulation: ViewEncapsulation.None
})
export class MenuComponent {

    /** @hidden */
    @ContentChildren(MenuGroupComponent)
    menuGroup: QueryList<MenuGroupComponent>;

    /** @hidden */
    @ContentChildren(MenuListDirective)
    menuList: QueryList<MenuListDirective>;

    /** @hidden */
    @HostBinding('class.fd-menu')
    fdMenuClass: boolean = true;
}
