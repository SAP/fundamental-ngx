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
import { ShellbarActionComponent } from '../shellbar-action/shellbar-action.component';
import { ActionSheetComponent } from '@fundamental-ngx/core/action-sheet';

@Component({
    selector: 'fd-shellbar-actions-mobile',
    templateUrl: './shellbar-actions-mobile.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShellbarActionsMobileComponent implements AfterContentChecked {
    @ViewChild(ActionSheetComponent)
    actionSheetComponent: ActionSheetComponent;

    /** @hidden */
    @Input()
    shellbarActions: QueryList<ShellbarActionComponent>;

    /** @hidden */
    @Input()
    collapsedItemMenuLabel: string;

    @Input()
    isSearch: boolean;

    @Output() enableSearchInMobile = new EventEmitter();

    /** @hidden */
    totalNotifications: number;

    /** @hidden */
    actionClicked(item: ShellbarActionComponent, event: MouseEvent): void {
        if (item.callback) {
            item.callback(event);
        }
        this.actionSheetComponent.close();
    }

    showSearchField(): void {
        this.isSearch = true;
        this.enableSearchInMobile.emit(this.isSearch);
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
