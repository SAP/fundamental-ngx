import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { FDB_NAVIGATION, FdbNavigationState } from '@fundamental-ngx/btp/navigation';
import { FdbViewMode } from '@fundamental-ngx/btp/shared';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { ObjectStatusComponent } from '@fundamental-ngx/core/object-status';
import { SegmentedButtonComponent } from '@fundamental-ngx/core/segmented-button';

export interface ExampleNavigationItem {
    icon?: string;
    title: string;
    expanded?: boolean;
    group?: boolean;
}

@Component({
    selector: 'fdb-navigation-indication-tags',
    templateUrl: './navigation-indication-tags.component.html',
    imports: [
        RouterLink,
        FormsModule,
        ButtonComponent,
        SegmentedButtonComponent,
        ObjectStatusComponent,
        FDB_NAVIGATION
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class NavigationIndicationTagsExampleComponent {
    state: FdbNavigationState = 'expanded';
    mode: FdbViewMode = '';

    onQuickCreateClick(): void {
        alert('Quick create!');
    }
}
