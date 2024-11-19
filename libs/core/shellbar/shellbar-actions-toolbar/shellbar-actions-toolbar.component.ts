import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, QueryList } from '@angular/core';
import { ButtonBadgeDirective, ButtonComponent } from '@fundamental-ngx/core/button';
import { ToolbarComponent, ToolbarItemDirective, ToolbarSpacerDirective } from '@fundamental-ngx/core/toolbar';
import { FdTranslatePipe } from '@fundamental-ngx/i18n';
import { ShellbarActionComponent } from '../shellbar-action/shellbar-action.component';

@Component({
    selector: 'fd-shellbar-actions-toolbar',
    templateUrl: './shellbar-actions-toolbar.component.html',
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
export class ShellbarActionsToolbarComponent {
    /** Actions displayed in the toolbar. */
    @Input() shellbarActions: QueryList<ShellbarActionComponent>;

    /** Whether a search button exists. */
    @Input() searchExists = false;

    /** Total notification count from overflowed items. */
    @Input() totalNotifications = 0;

    /** Event emitted when the search button is clicked. */
    @Output() showSearch = new EventEmitter<void>();

    /** Handles action button clicks. */
    handleActionClick(action: ShellbarActionComponent, event: MouseEvent): void {
        action.callback?.(event);
    }

    /** Handles overflow change and recalculates notification count. */
    handleOverflow(overflowItems: any[]): void {
        this.totalNotifications = overflowItems.reduce((total, item) => {
            const badgeValue = this.extractBadgeValue(item._elementRef.nativeElement);
            return total + (parseInt(badgeValue ?? '0', 10) || 0);
        }, 0);
    }

    /** Extracts the badge value from a toolbar item's nativeElement */
    private extractBadgeValue(nativeElement: HTMLElement): string | null {
        const children = Array.from(nativeElement.children);
        const badgeElement = children.find((child) => child.classList.contains('fd-button__badge'));
        return badgeElement?.textContent?.trim() || null;
    }
}
