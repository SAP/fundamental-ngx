import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { FDB_NAVIGATION, FdbNavigationState } from '@fundamental-ngx/btp/navigation';
import { FdbViewMode } from '@fundamental-ngx/btp/shared';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { SegmentedButtonComponent } from '@fundamental-ngx/core/segmented-button';
import { PlatformSearchFieldModule, SearchInput } from '@fundamental-ngx/platform/search-field';

export interface ExampleNavigationItem {
    icon?: string;
    title: string;
    expanded?: boolean;
    group?: boolean;
}

@Component({
    selector: 'fdb-sticky-area',
    templateUrl: './sticky-area.component.html',
    imports: [
        RouterLink,
        FormsModule,
        ButtonComponent,
        SegmentedButtonComponent,
        PlatformSearchFieldModule,
        FDB_NAVIGATION
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class StickyAreaExampleComponent {
    state: FdbNavigationState = 'expanded';
    mode: FdbViewMode = '';
    searchTerm = '';

    onQuickCreateClick(): void {
        alert('Quick create!');
    }

    onSearchSubmit($event: SearchInput): void {
        this.searchTerm = $event.text;
        alert(`Search submitted: ${this.searchTerm}`);
    }

    onInputChange($event: SearchInput): void {
        this.searchTerm = $event.text;
    }
}
