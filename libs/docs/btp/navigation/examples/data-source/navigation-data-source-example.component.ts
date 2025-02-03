import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { FDB_NAVIGATION, FdbNavigationState, NavigationDataSourceItem } from '@fundamental-ngx/btp/navigation';
import { FdbViewMode } from '@fundamental-ngx/btp/shared';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { SegmentedButtonComponent } from '@fundamental-ngx/core/segmented-button';

interface ExampleNavigationItem {
    icon?: string;
    title: string;
    expanded?: boolean;
    group?: boolean;
    link?: string;
    home?: boolean;
}

@Component({
    selector: 'fdb-navigation-data-source-example',
    imports: [RouterLink, FormsModule, SegmentedButtonComponent, ButtonComponent, FDB_NAVIGATION],
    templateUrl: './navigation-data-source-example.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationDataSourceExampleComponent {
    state: FdbNavigationState = 'expanded';
    mode: FdbViewMode = '';
    /** Used for autocompletition. */
    type: ExampleNavigationItem;

    dataSource: NavigationDataSourceItem<ExampleNavigationItem>[] = [
        {
            title: 'Home',
            icon: 'home',
            home: true,
            placement: 'start'
        },
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
                            placement: 'start',
                            link: '/core'
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
                            placement: 'start',
                            link: '/btp/navigation'
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
