import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
    NavigationComponent,
    NavigationContentEndComponent,
    NavigationContentStartComponent,
    NavigationHomeDirective,
    NavigationLinkComponent,
    NavigationListComponent,
    NavigationListItemComponent
} from '@fundamental-ngx/btp/navigation';

@Component({
    selector: 'fdb-navigation-parent-item-link',
    standalone: true,
    imports: [
        NavigationComponent,
        NavigationListComponent,
        NavigationListItemComponent,
        NavigationLinkComponent,
        RouterLink,
        NavigationHomeDirective,
        NavigationContentStartComponent,
        NavigationContentEndComponent
    ],
    templateUrl: './navigation-parent-item-link.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationParentItemLinkComponent {}
