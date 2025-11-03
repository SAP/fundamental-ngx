import { ChangeDetectionStrategy, Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { FDB_NAVIGATION, FdbNavigationState, NavigationComponent } from '@fundamental-ngx/btp/navigation';
import { FdbViewMode } from '@fundamental-ngx/btp/shared';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { SegmentedButtonComponent } from '@fundamental-ngx/core/segmented-button';

@Component({
    selector: 'fdb-selection-mode',
    imports: [RouterLink, FormsModule, ButtonComponent, SegmentedButtonComponent, FDB_NAVIGATION],
    templateUrl: './selection-mode.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectionModeComponent {
    @ViewChild(NavigationComponent) navigation!: NavigationComponent;

    state: FdbNavigationState = 'expanded';
    mode: FdbViewMode = '';
    selectionMode: 'router' | 'click' = 'click';

    onQuickCreateClick(): void {
        alert('Quick create!');
    }

    /**
     * Clear the current selection in click mode.
     */
    clearSelection(): void {
        if (this.navigation) {
            this.navigation.clearSelection();
        }
    }

    /**
     * Get information about the currently selected item.
     */
    showSelectedItem(): void {
        if (this.navigation) {
            const selectedItem = this.navigation.getSelectedItem();
            if (selectedItem) {
                // Try to get text content from the link element if available
                const linkElement = selectedItem.link$()?.elementRef?.nativeElement;
                const itemText = linkElement?.textContent?.trim() || 'Selected item';
                alert(`Selected item: ${itemText}`);
            } else {
                alert('No item selected');
            }
        }
    }
}
