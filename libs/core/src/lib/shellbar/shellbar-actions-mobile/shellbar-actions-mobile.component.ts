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
import { FdTranslatePipe } from '@fundamental-ngx/i18n';
import { NgIf, NgFor } from '@angular/common';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { ActionSheetModule } from '@fundamental-ngx/core/action-sheet';

@Component({
    selector: 'fd-shellbar-actions-mobile',
    templateUrl: './shellbar-actions-mobile.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [ActionSheetModule, ButtonModule, NgIf, NgFor, FdTranslatePipe]
})
export class ShellbarActionsMobileComponent implements AfterContentChecked {
    /** @hidden */
    @Input()
    shellbarActions: QueryList<ShellbarActionComponent>;

    /** @hidden */
    @Input()
    collapsedItemMenuLabel: string;

    /**
     * Whether the search is present in the shellbar.
     */
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
