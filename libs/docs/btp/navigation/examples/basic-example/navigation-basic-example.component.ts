import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import {
    FdbNavigationState,
    NavigationComponent,
    NavigationContentEndComponent,
    NavigationContentStartComponent,
    NavigationDataSourceItem,
    NavigationLinkComponent,
    NavigationLinkRefDirective,
    NavigationListItemComponent,
    NavigationListItemRefDirective
} from '@fundamental-ngx/btp/navigation';
import { FdbViewMode } from '@fundamental-ngx/btp/shared';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { SegmentedButtonComponent } from '@fundamental-ngx/core/segmented-button';
import { NavigationListDataSourceDirective } from 'libs/btp/navigation/directives/navigation-list-data-source.directive';

export interface ExampleNavigationItem {
    icon?: string;
    title: string;
    expanded?: boolean;
    group?: boolean;
}

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
        NavigationListDataSourceDirective,
        NavigationListItemRefDirective
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true
})
export class NavigationBasicExampleComponent {
    state: FdbNavigationState = 'expanded';
    mode: FdbViewMode = '';

    dataSource: NavigationDataSourceItem<ExampleNavigationItem>[] = [
        {
            title: 'Main items',
            group: true,
            placement: 'start',
            expanded: true,
            children: [
                {
                    title: 'Item 1',
                    icon: 'basket',
                    placement: 'start',
                    children: [
                        {
                            title: 'Item 1.1',
                            icon: 'basket',
                            placement: 'start'
                        },
                        {
                            title: 'Item 1.2',
                            icon: 'basket',
                            placement: 'start'
                        },
                        {
                            title: 'Item 1.3',
                            icon: 'basket',
                            placement: 'start'
                        },
                        {
                            title: 'Item 1.4',
                            icon: 'basket',
                            placement: 'start'
                        }
                    ]
                },
                {
                    title: 'Item 2',
                    icon: 'basket',
                    placement: 'start',
                    expanded: true,
                    children: [
                        {
                            title: 'Item 2.1',
                            icon: 'basket',
                            placement: 'start'
                        },
                        {
                            title: 'Item 2.2',
                            icon: 'basket',
                            placement: 'start'
                        },
                        {
                            title: 'Item 2.3',
                            icon: 'basket',
                            placement: 'start'
                        },
                        {
                            title: 'Item 2.4',
                            icon: 'basket',
                            placement: 'start'
                        }
                    ]
                },
                {
                    title: 'Item 3',
                    icon: 'basket',
                    placement: 'start'
                },
                {
                    title: 'Item 4',
                    icon: 'basket',
                    placement: 'start'
                },
                {
                    title: 'Item 5',
                    icon: 'basket',
                    placement: 'start'
                },
                {
                    title: 'Item 6',
                    icon: 'basket',
                    placement: 'start'
                }
            ]
        },
        {
            title: 'Favourites',
            icon: 'settings',
            placement: 'start',
            group: true,
            expanded: true,
            children: [
                {
                    title: 'Favourite Item 1',
                    icon: 'settings',
                    placement: 'start',
                    children: [
                        {
                            title: 'Favourite Item 1.1',
                            icon: 'settings',
                            placement: 'start'
                        },
                        {
                            title: 'Favourite Item 1.2',
                            icon: 'settings',
                            placement: 'start'
                        },
                        {
                            title: 'Favourite Item 1.3',
                            icon: 'settings',
                            placement: 'start'
                        },
                        {
                            title: 'Favourite Item 1.4',
                            icon: 'settings',
                            placement: 'start'
                        }
                    ]
                },
                {
                    title: 'Favourite Item 2',
                    icon: 'settings',
                    placement: 'start',
                    expanded: true,
                    children: [
                        {
                            title: 'Favourite Item 2.1',
                            icon: 'settings',
                            placement: 'start'
                        },
                        {
                            title: 'Favourite Item 2.2',
                            icon: 'settings',
                            placement: 'start'
                        },
                        {
                            title: 'Favourite Item 2.3',
                            icon: 'settings',
                            placement: 'start'
                        },
                        {
                            title: 'Favourite Item 2.4',
                            icon: 'settings',
                            placement: 'start'
                        }
                    ]
                },
                {
                    title: 'Favourite Item 3',
                    icon: 'settings',
                    placement: 'start'
                },
                {
                    title: 'Favourite Item 4',
                    icon: 'settings',
                    placement: 'start'
                },
                {
                    title: 'Favourite Item 5',
                    icon: 'settings',
                    placement: 'start'
                },
                {
                    title: 'Favourite Item 6',
                    icon: 'settings',
                    placement: 'start'
                }
            ]
        },
        {
            title: 'Item 6',
            icon: 'create-entry-time',
            placement: 'end'
        }
    ];
}
