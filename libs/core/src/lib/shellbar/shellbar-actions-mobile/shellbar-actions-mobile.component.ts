import {
    AfterContentChecked,
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    Output,
    QueryList,
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
    @Input()
    searchExists = false;

    /** @hidden */
    totalNotifications: number;

    /** @hidden */
    @Output()
    showSearch = new EventEmitter<void>();

    /** @hidden */
    actionClicked(item: ShellbarActionComponent, event: MouseEvent): void {
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
