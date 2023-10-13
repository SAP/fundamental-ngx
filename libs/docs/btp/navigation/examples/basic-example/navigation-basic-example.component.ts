import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import {
    FdbNavigationState,
    NavigationComponent,
    NavigationContentEndComponent,
    NavigationContentStartComponent,
    NavigationHomeDirective,
    NavigationLinkComponent,
    NavigationListComponent,
    NavigationListItemComponent
} from '@fundamental-ngx/btp/navigation';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { SegmentedButtonComponent } from '@fundamental-ngx/core/segmented-button';

@Component({
    selector: 'fdb-navigation-basic-example',
    templateUrl: './navigation-basic-example.component.html',
    imports: [
        NavigationComponent,
        NavigationListComponent,
        NavigationListItemComponent,
        NavigationLinkComponent,
        RouterLink,
        NavigationHomeDirective,
        NavigationContentStartComponent,
        NavigationContentEndComponent,
        FormsModule,
        ButtonComponent,
        SegmentedButtonComponent
    ],
    standalone: true
})
export class NavigationBasicExampleComponent {
    value: FdbNavigationState = 'expanded';
}
