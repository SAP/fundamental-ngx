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
import {
    ActionSheetBodyComponent,
    ActionSheetComponent,
    ActionSheetControlComponent,
    ActionSheetItemComponent
} from '@fundamental-ngx/core/action-sheet';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { FdTranslatePipe } from '@fundamental-ngx/i18n';
import { ShellbarActionComponent } from '../shellbar-action/shellbar-action.component';

@Component({
    selector: 'fd-shellbar-actions-mobile',
    templateUrl: './shellbar-actions-mobile.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        ActionSheetComponent,
        ActionSheetControlComponent,
        ActionSheetItemComponent,
        ActionSheetBodyComponent,
        ButtonComponent,
        FdTranslatePipe
    ]
})
export class ShellbarActionsMobileComponent implements AfterContentChecked {
    /** @hidden */
    @Input()
    shellbarActions: QueryList<ShellbarActionComponent>;

    /**
     * Whether the search is present in the shellbar.
     */
    @Input()
    searchExists = false;

    /** @hidden */
    @Output()
    showSearch = new EventEmitter<void>();

    /** @hidden */
    totalNotifications: number;

    /** @hidden */
    actionClicked(item: ShellbarActionComponent, event: MouseEvent): void {
        if (item.callback) {
            item.callback(event);
        }
    }

    /** @hidden */
    ngAfterContentChecked(): void {
        this.totalNotifications = 0;

        this.shellbarActions?.forEach((action) => {
            if (action.notificationCount && typeof action.notificationCount === 'number') {
                this.totalNotifications = this.totalNotifications + action.notificationCount;
            }
        });
    }
}
