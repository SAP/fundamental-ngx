import {
    AfterContentInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Host,
    Input,
    OnDestroy,
    Optional,
    ViewEncapsulation
} from '@angular/core';
import { Subscription } from 'rxjs';

import { ShellbarUser } from '../../../model/shellbar-user';
import { UserActionsMenuService } from '../../services/user-actions-menu.service';
import { UserActionsMenuComponent } from '../user-actions-menu/user-actions-menu.component';
import { UserActionsSubmenuComponent } from '../user-actions-submenu/user-actions-submenu.component';

@Component({
    selector: 'fd-user-actions-menu-header',
    templateUrl: './user-actions-menu-header.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserActionsMenuHeaderComponent implements AfterContentInit, OnDestroy {
    /** Whether header component has removed borders */
    @Input()
    showMainHeader = true;

    /** @hidden */
    get title(): string {
        const activeSubmenu = this._menuService?.getActiveSubmenu();

        return activeSubmenu.title;
    }

    /** @hidden */
    get user(): ShellbarUser {
        return this._menuService?.menu.user;
    }

    /** @hidden */
    _isSubmenu = false;

    /** @hidden */
    _compact = false;

    /** @hidden */
    private _menuService: UserActionsMenuService;

    /** @hidden */
    private subscription = new Subscription();

    /** @hidden */
    constructor(
        /** @hidden */
        private readonly _cd: ChangeDetectorRef,
        /** @hidden */
        @Optional() @Host() private readonly _manuComponent: UserActionsMenuComponent,
        /** @hidden */
        @Optional() @Host() private readonly _submanuComponent: UserActionsSubmenuComponent
    ) {}

    /** @hidden */
    ngAfterContentInit(): void {
        const { _menuService } = this._submanuComponent || this._manuComponent;
        this._menuService = _menuService;

        this.subscription.add(
            this._menuService.isSubmenu$.subscribe((isSubmenu) => {
                this._isSubmenu = isSubmenu;
                this._cd.markForCheck();
            })
        );

        this.subscription.add(
            this._menuService.isCompact$.subscribe((compact) => {
                this._compact = compact;
                this._cd.markForCheck();
            })
        );
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    /** @hidden */
    _backToParentLevel(): void {
        const { activeNodePath } = this._menuService;

        this._menuService.setActive(false, activeNodePath[activeNodePath.length - 1].item);
    }
}
