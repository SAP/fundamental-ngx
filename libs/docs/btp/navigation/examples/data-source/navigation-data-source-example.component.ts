import { NgTemplateOutlet } from '@angular/common';
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
    imports: [RouterLink, FormsModule, SegmentedButtonComponent, ButtonComponent, FDB_NAVIGATION, NgTemplateOutlet],
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
            placement: 'start'
        },
        {
            title: 'Favourites',
            icon: 'favorite-list',
            placement: 'start'
        },
        {
            title: 'Recent',
            icon: 'time-account',
            placement: 'start'
        },
        {
            title: 'Sales',
            group: true,
            placement: 'start',
            expanded: true,
            children: [
                {
                    title: 'Leads',
                    icon: 'lead',
                    placement: 'start',
                    expanded: true,
                    children: [
                        {
                            title: 'All Leads',
                            placement: 'start',
                            link: '/btp/navigation'
                        },
                        {
                            title: 'Lead Sources',
                            placement: 'start',
                            link: '/core'
                        }
                    ]
                },
                {
                    title: 'Opportunities',
                    icon: 'opportunities',
                    placement: 'start',
                    expanded: true,
                    children: [
                        {
                            title: 'All Opportunities',
                            placement: 'start'
                        },
                        {
                            title: 'Team Pipeline',
                            placement: 'start'
                        }
                    ]
                },
                {
                    title: 'Sales Quotes',
                    icon: 'sales-quote',
                    placement: 'start',
                    children: [
                        {
                            title: 'All Quotes',
                            placement: 'start'
                        },
                        {
                            title: 'Reports',
                            placement: 'start'
                        }
                    ]
                }
            ]
        },
        {
            title: 'Reports and Analytics',
            group: true,
            placement: 'start',
            expanded: true,
            children: [
                {
                    title: 'Sales Reports',
                    icon: 'manager-insight',
                    placement: 'start'
                },
                {
                    title: 'Performance Reports',
                    icon: 'kpi-corporate-performance',
                    placement: 'start'
                }
            ]
        },
        {
            title: 'Customer Management',
            group: true,
            placement: 'start',
            children: [
                {
                    title: 'Contacts',
                    icon: 'contacts',
                    placement: 'start'
                },
                {
                    title: 'Companies',
                    icon: 'company-view',
                    placement: 'start'
                },
                {
                    title: 'Partners',
                    icon: 'citizen-connect',
                    placement: 'start'
                }
            ]
        },
        {
            title: 'Task Manager',
            icon: 'task',
            placement: 'start'
        },
        {
            title: 'Create Ticket',
            icon: 'write-new',
            placement: 'end'
        },
        {
            title: 'Dashboard',
            icon: 'bbyd-dashboard',
            placement: 'end'
        },
        {
            title: 'Create Ticket',
            icon: 'write-new',
            placement: 'end'
        },
        {
            title: 'Dashboard',
            icon: 'bbyd-dashboard',
            placement: 'end'
        }
    ];
}
