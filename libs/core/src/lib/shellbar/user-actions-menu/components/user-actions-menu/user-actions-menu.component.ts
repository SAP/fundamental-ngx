import {
    AfterContentInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChild,
    ContentChildren,
    EventEmitter,
    HostBinding,
    Input,
    OnDestroy,
    Output,
    QueryList,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';

import { PopoverComponent } from '../../../../popover/popover.component';
import { Placement } from '../../../../popover/popover-position/popover-position';
import { ShellbarUser } from '../../../model/shellbar-user';
import { UserActionsMenuService } from '../../services/user-actions-menu.service';
import { UserActionsSubmenuComponent } from '../user-actions-submenu/user-actions-submenu.component';
import { UserActionsMenuItemDirective } from '../../directives/user-actions-menu-item.directive';
import { UserActionsMenuHeaderComponent } from '../user-actions-menu-header/user-actions-menu-header.component';

@Component({
    selector: 'fd-user-actions-menu',
    templateUrl: './user-actions-menu.component.html',
    styleUrls: ['./user-actions-menu.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [UserActionsMenuService]
})
export class UserActionsMenuComponent implements AfterContentInit, OnDestroy {
    /** The user data. */
    @Input()
    user: ShellbarUser;

    /** Maximum width of popover body in px, prevents from overextending body by `fillControlMode`  */
    @Input()
    width = 288;

    /** The placement of the popover. It can be one of: top, top-start, top-end, bottom,
     *  bottom-start, bottom-end, right, right-start, right-end, left, left-start, left-end. */
    @Input()
    placement: Placement = 'bottom-end';

    /** Whether the popover is open. Can be used through two-way binding. */
    @Input()
    isOpen = false;

    /** Whether the popover is disabled. */
    @Input()
    @HostBinding('class.fd-popover-custom--disabled')
    disabled = false;

    /** Whether the popover should close when the escape key is pressed. */
    @Input()
    closeOnEscapeKey = true;

    /** Whether the popover should close when a click is made outside its boundaries. */
    @Input()
    closeOnOutsideClick = true;

    /** Whether the popover container needs an extra class for styling. */
    @Input()
    get additionalBodyClass(): string {
        const bodyClass = `${this._additionalBodyClass} ${this._menuClass}`;
        if (this.compact) {
            return `${bodyClass} ${this._menuClass}--compact`;
        }

        return bodyClass;
    }

    set additionalBodyClass(classs: string) {
        this._additionalBodyClass = classs;
    }

    /** Display menu in compact mode */
    @Input()
    get compact(): boolean {
        return this._compact;
    }

    set compact(value: boolean) {
        this._compact = value;
        this._menuService.setCompactMode(value);
    }

    /** Event emitted when the state of the isOpen property changes. */
    @Output()
    isOpenChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    /** @hidden */
    @ViewChild(PopoverComponent)
    _popover: PopoverComponent;

    /** @hidden */
    @ContentChildren(UserActionsMenuItemDirective, { descendants: true })
    _items: QueryList<UserActionsMenuItemDirective>;

    /** @hidden */
    @ContentChild(UserActionsMenuHeaderComponent)
    _header: UserActionsMenuHeaderComponent;

    /** @hidden */
    get activeSubmenu(): UserActionsSubmenuComponent | null {
        return this._activeSubmenu;
    }

    /** @hidden */
    set activeSubmenu(activeSubmenu: UserActionsSubmenuComponent | null) {
        this._activeSubmenu = activeSubmenu;

        this._cd.markForCheck();
    }

    /** @hidden */
    private _compact = false;

    /** @hidden */
    private _menuClass = 'fd-user-menu';

    private _additionalBodyClass: string;

    /** @hidden */
    private _activeSubmenu?: UserActionsSubmenuComponent;

    constructor(
        /** @hidden */
        private readonly _cd: ChangeDetectorRef,
        /** @hidden */
        public readonly _menuService: UserActionsMenuService
    ) {}

    /** @hidden */
    ngOnDestroy(): void {
        this._menuService.resetMenuState();
    }

    /** @hidden */
    ngAfterContentInit(): void {
        this._menuService.setMenuRoot(this);
    }

    /** @hidden */
    _toggle(): void {
        if (!this.isOpen) {
            this.activeSubmenu = null;
            this._menuService.resetMenuState();
        }

        this.isOpen = !this.isOpen;
    }

    isOpenChangeEvent(event: boolean): void {
        this.isOpen = event;
        this.isOpenChange.emit(event);
    }
}
