import { AfterContentInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Host, Input, OnDestroy, Optional, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';

import { UserActionsMenuComponent } from '../user-actions-menu/user-actions-menu.component';
import { UserActionsSubmenuComponent } from '../user-actions-submenu/user-actions-submenu.component';

@Component({
    selector: 'fd-user-actions-menu-footer',
    templateUrl: './user-actions-menu-footer.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class UserActionsMenuFooterComponent implements AfterContentInit, OnDestroy {
    /**
     * Alignment of footer content.
     * Options include 'left', 'right' and 'middle'. The default is set to 'left'.
     * */
     @Input()
     align: 'left' | 'right' | 'middle' = 'left';

    /** @hidden */
    _compact = false;

    /** @hidden */
    get barPosition(): string {
        return `fd-bar__${this.align}`;
    }

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
        this.subscription.add(_menuService?.isCompact$.subscribe(compact => {
            this._compact = compact;
            this._cd.markForCheck();
        }));
    }

    /** @hidden */
    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
