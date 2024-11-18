import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, QueryList } from '@angular/core';
import { ButtonBadgeDirective, ButtonComponent } from '@fundamental-ngx/core/button';
import { ToolbarComponent, ToolbarItemDirective, ToolbarSpacerDirective } from '@fundamental-ngx/core/toolbar';
import { FdTranslatePipe } from '@fundamental-ngx/i18n';
import { ShellbarActionComponent } from '../shellbar-action/shellbar-action.component';

@Component({
    selector: 'fd-shellbar-toolbar',
    templateUrl: './shellbar-toolbar.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        ButtonComponent,
        FdTranslatePipe,
        ToolbarComponent,
        ButtonComponent,
        ToolbarItemDirective,
        ButtonBadgeDirective,
        ToolbarSpacerDirective
    ],
    styles: [
        `
            :host {
                flex: 1;
            }
        `
    ]
})
export class ShellbarToolbarComponent {
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
    totalNotifications;

    /** @hidden */
    actionClicked(item: ShellbarActionComponent, event: MouseEvent): void {
        if (item.callback) {
            item.callback(event);
        }
    }

    /** Handles overflow changes */
    onOverflowChanged(overflowItems: any[]): void {
        // Reset totalNotifications
        // this.totalNotifications = 0;

        overflowItems.forEach((item) => {});
    }
}
