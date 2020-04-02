import {
    AfterContentChecked,
    ChangeDetectionStrategy,
    Component, Input, QueryList,
    ViewEncapsulation
} from '@angular/core';
import { ShellbarActionComponent } from '../shellbar-action/shellbar-action.component';

@Component({
    selector: 'fd-shellbar-actions-mobile',
    templateUrl: './shellbar-actions-mobile.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShellbarActionsMobileComponent implements AfterContentChecked {

    /** @hidden */
    @Input()
    shellbarActions: QueryList<ShellbarActionComponent>;

    /** @hidden */
    @Input()
    collapsedItemMenuLabel: string;

    /** @hidden */
    totalNotifications: number;

    /** @hidden */
    showCollapsedProducts: boolean = false;

    /** @hidden */
    toggleCollapsedProducts(event: MouseEvent): void {
        event.preventDefault();
        event.stopPropagation();
        this.showCollapsedProducts = !this.showCollapsedProducts;
    }

    /**
     * @hidden
     */
    actionClicked(item: ShellbarActionComponent, event: any): void {
        if (item.callback) {
            item.callback(event);
        }
    }

    /** @hidden */
    ngAfterContentChecked(): void {
        this.totalNotifications = 0;
        this.shellbarActions.forEach((action) => {
            if (action.notificationCount && typeof action.notificationCount === 'number') {
                this.totalNotifications = this.totalNotifications + action.notificationCount;
            }
        });
    }

}
