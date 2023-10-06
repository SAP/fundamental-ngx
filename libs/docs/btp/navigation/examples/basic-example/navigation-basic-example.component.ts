import { Component } from '@angular/core';
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
        NavigationContentEndComponent
    ],
    standalone: true
})
export class NavigationBasicExampleComponent {}
