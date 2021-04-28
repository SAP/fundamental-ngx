import {
    AfterContentInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChild,
    ContentChildren,
    forwardRef,
    Input,
    OnDestroy,
    QueryList,
    TemplateRef,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { Subscription } from 'rxjs';

import { UserActionsMenuItemDirective } from '../../directives/user-actions-menu-item.directive';
import { UserActionsMenuService } from '../../services/user-actions-menu.service';
import { UserActionsMenuHeaderComponent } from '../user-actions-menu-header/user-actions-menu-header.component';

@Component({
    selector: 'fd-user-actions-submenu',
    templateUrl: './user-actions-submenu.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserActionsSubmenuComponent implements AfterContentInit, OnDestroy {
    /** Submenu title */
    @Input()
    title: string;

    /** @hidden */
    @ContentChild(UserActionsMenuHeaderComponent)
    _header: UserActionsMenuHeaderComponent;

    /** @hidden */
    @ContentChildren(forwardRef(() => UserActionsMenuItemDirective), { descendants: true })
    _items: QueryList<UserActionsMenuItemDirective>;

    /** @hidden Reference to template with Submenu content  */
    @ViewChild(TemplateRef) _templateRef: TemplateRef<HTMLElement>;

    /** @hidden */
    _compact = false;

    /** @hidden */
    _menuService: UserActionsMenuService;

    /** @hidden */
    private subscription = new Subscription();

    /** @hidden */
    constructor(
        /** @hidden */
        private readonly _cd: ChangeDetectorRef,
    ) {}

    /** @hidden */
    ngAfterContentInit(): void {
        this.subscription.add(
            this._menuService.isCompact$.subscribe((compact) => {
                this._compact = compact;
                this._cd.markForCheck();
            })
        );
    }

    /** @hidden */
    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
