import {
    AfterContentChecked,
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    Output,
    QueryList,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { ActionSheetComponent } from '@fundamental-ngx/core/action-sheet';
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
    _showFullWidthCombobox = false;

    @ViewChild(ActionSheetComponent)
    actionSheetComponent: ActionSheetComponent;

    @Output() showFullWidthCombobox = new EventEmitter();

    /** @hidden */
    actionClicked(item: ShellbarActionComponent, event: MouseEvent): void {
        if (item.callback) {
            item.callback(event);
        }
    }

    /** @hidden */
    _showCombobox(): void {
        this.showFullWidthCombobox.emit(true);
        this.actionSheetComponent.close();
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
