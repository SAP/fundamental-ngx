import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
    NavigationComponent,
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
        NavigationHomeDirective
    ],
    standalone: true
})
export class NavigationBasicExampleComponent {}
