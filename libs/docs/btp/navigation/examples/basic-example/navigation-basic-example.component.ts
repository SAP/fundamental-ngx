import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import {
    FdbNavigationState,
    NavigationComponent,
    NavigationContentEndComponent,
    NavigationContentStartComponent,
    NavigationItemSpacerComponent,
    NavigationLinkComponent,
    NavigationLinkRefDirective,
    NavigationListItemComponent
} from '@fundamental-ngx/btp/navigation';
import { FdbViewMode } from '@fundamental-ngx/btp/shared';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { SegmentedButtonComponent } from '@fundamental-ngx/core/segmented-button';

@Component({
    selector: 'fdb-navigation-basic-example',
    templateUrl: './navigation-basic-example.component.html',
    imports: [
        RouterLink,
        FormsModule,
        ButtonComponent,
        SegmentedButtonComponent,
        NavigationComponent,
        NavigationListItemComponent,
        NavigationContentStartComponent,
        NavigationContentEndComponent,
        NavigationLinkComponent,
        NavigationLinkRefDirective,
        NavigationItemSpacerComponent
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true
})
export class NavigationBasicExampleComponent {
    state: FdbNavigationState = 'expanded';
    mode: FdbViewMode = '';
}
