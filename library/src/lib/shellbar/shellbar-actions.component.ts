import { Component, ContentChildren, HostListener, Input, OnInit, AfterContentChecked, QueryList } from '@angular/core';
import { ShellbarActionComponent } from './shellbar-action.component';

@Component({
    selector: 'fd-shellbar-actions',
    templateUrl: './shellbar-actions.component.html'
})
export class ShellbarActionsComponent implements OnInit, AfterContentChecked {
    actionsCollapsed: boolean = false;

    showCollapsedProducts: boolean = false;

    @Input()
    productSwitcher: any[];

    @Input()
    user: any;

    @Input()
    userMenu: any[];

    /** Label for the collapsed item menu. */
    @Input()
    collapsedItemMenuLabel: string = 'Collapsed Item Menu';

    @ContentChildren(ShellbarActionComponent)
    shellbarActions: QueryList<ShellbarActionComponent>;

    totalNotifications: number;

    @HostListener('window:resize', [])
    onResize() {
        this.actionsCollapsed = window.innerWidth < 1024;
    }

    ngOnInit() {
        this.onResize();
    }

    ngAfterContentChecked() {
        this.totalNotifications = 0;
        this.shellbarActions.forEach((action) => {
            if (action.notificationCount && typeof action.notificationCount === 'number') {
                this.totalNotifications = this.totalNotifications + action.notificationCount;
            }
        });
    }

    toggleCollapsedProducts(event) {
        event.preventDefault();
        event.stopPropagation();
        this.showCollapsedProducts = !this.showCollapsedProducts;
    }

}
