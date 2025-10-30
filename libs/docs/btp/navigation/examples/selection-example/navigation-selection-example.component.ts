import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { FDB_NAVIGATION, FdbNavigationState, NavigationDataSourceItem } from '@fundamental-ngx/btp/navigation';
import { FdbViewMode } from '@fundamental-ngx/btp/shared';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { SegmentedButtonComponent } from '@fundamental-ngx/core/segmented-button';

interface ExampleNavigationItem {
    id?: string;
    icon?: string;
    title?: string;
    expanded?: boolean;
    group?: boolean;
    link?: string;
    routerLink?: any[];
    external?: boolean;
    quickCreate?: boolean;
    separator?: boolean;
    home?: boolean;
    selected?: boolean;
    disabled?: boolean;
    children?: ExampleNavigationItem[];
    supportsSelection?: boolean;
}

@Component({
    selector: 'fdb-navigation-selection-example',
    imports: [RouterLink, FormsModule, ButtonComponent, SegmentedButtonComponent, FDB_NAVIGATION],
    templateUrl: './navigation-selection-example.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationSelectionExampleComponent {
    type: ExampleNavigationItem;
    state: FdbNavigationState = 'expanded';
    mode: FdbViewMode = '';

    dataSource: NavigationDataSourceItem<ExampleNavigationItem>[] = [
        {
            title: 'Home',
            icon: 'home',
            placement: 'start',
            supportsSelection: true,
            selected: true
        },
        {
            title: 'Favourites',
            icon: 'favorite-list',
            placement: 'start',
            supportsSelection: true
        },
        {
            title: 'Recent',
            icon: 'time-account',
            placement: 'start',
            supportsSelection: true,
            disabled: true
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
                            supportsSelection: true
                        },
                        {
                            title: 'Lead Sources (External Link)',
                            placement: 'start',
                            external: true,
                            supportsSelection: true
                        }
                    ]
                },
                {
                    title: 'Opportunities (Parent Link)',
                    icon: 'opportunities',
                    placement: 'start',
                    routerLink: ['/core'],
                    expanded: true,
                    children: [
                        {
                            title: 'All Opportunities',
                            placement: 'start',
                            supportsSelection: true
                        },
                        {
                            title: 'Team Pipeline',
                            placement: 'start',
                            supportsSelection: true
                        }
                    ]
                },
                {
                    title: 'Sales Quotes (Parent Link)',
                    icon: 'sales-quote',
                    placement: 'start',
                    routerLink: ['/core'],
                    children: [
                        {
                            title: 'All Quotes',
                            placement: 'start',
                            supportsSelection: true
                        },
                        {
                            title: 'Reports',
                            placement: 'start',
                            supportsSelection: true
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
                    placement: 'start',
                    supportsSelection: true
                },
                {
                    title: 'Performance Reports',
                    icon: 'kpi-corporate-performance',
                    placement: 'start',
                    supportsSelection: true
                }
            ]
        },
        {
            separator: true,
            placement: 'start'
        },
        {
            title: 'Customer Management',
            group: true,
            placement: 'start',
            children: [
                {
                    title: 'Contacts',
                    icon: 'contacts',
                    placement: 'start',
                    supportsSelection: true
                },
                {
                    title: 'Companies',
                    icon: 'company-view',
                    placement: 'start',
                    supportsSelection: true
                },
                {
                    title: 'Partners',
                    icon: 'citizen-connect',
                    placement: 'start',
                    supportsSelection: true
                }
            ]
        },
        {
            separator: true,
            placement: 'start'
        },
        {
            title: 'Task Manager',
            icon: 'task',
            placement: 'start',
            supportsSelection: true
        },
        {
            title: 'Create Ticket',
            icon: 'write-new',
            placement: 'end',
            quickCreate: true
        },
        {
            title: 'Dashboard',
            icon: 'bbyd-dashboard',
            placement: 'end',
            supportsSelection: true
        }
    ];

    onQuickCreateClick(): void {
        alert('Quick create!');
    }

    toggleSelection(item: ExampleNavigationItem): void {
        // Only toggle selection for items that support it and are not disabled
        if (!item.supportsSelection || item.disabled) {
            return;
        }

        item.selected = !item.selected;
        this.removeSelectionFromItems(item.selected ? item : null);
    }

    removeSelectionFromItems(activeItem: ExampleNavigationItem | null, items = this.dataSource): void {
        items.forEach((item) => {
            if (item.children) {
                this.removeSelectionFromItems(activeItem, item.children);
            }
            if (item === activeItem) {
                return;
            }
            item.selected = false;
        });
    }
}
