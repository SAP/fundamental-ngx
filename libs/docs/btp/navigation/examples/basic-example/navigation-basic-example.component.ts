import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { FDB_NAVIGATION, FdbNavigationState } from '@fundamental-ngx/btp/navigation';
import { FdbViewMode } from '@fundamental-ngx/btp/shared';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { SegmentedButtonComponent } from '@fundamental-ngx/core/segmented-button';

export interface ExampleNavigationItem {
    icon?: string;
    title: string;
    expanded?: boolean;
    group?: boolean;
}

@Component({
    selector: 'fdb-navigation-basic-example',
    templateUrl: './navigation-basic-example.component.html',
    imports: [RouterLink, FormsModule, ButtonComponent, SegmentedButtonComponent, FDB_NAVIGATION],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class NavigationBasicExampleComponent {
    state: FdbNavigationState = 'expanded';
    mode: FdbViewMode = '';

    onQuickCreateClick(): void {
        alert('Quick create!');
    }
}
