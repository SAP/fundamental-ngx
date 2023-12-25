import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FDB_NAVIGATION, FdbNavigationState, NavigationDataSourceItem } from '@fundamental-ngx/btp/navigation';
import { FdbViewMode } from '@fundamental-ngx/btp/shared';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { SegmentedButtonComponent } from '@fundamental-ngx/core/segmented-button';

interface ExampleNavigationItem {
    icon?: string;
    title: string;
    expanded?: boolean;
    group?: boolean;
    selected?: boolean;
    home?: boolean;
    supportsSelection?: boolean;
}

@Component({
    selector: 'fdb-navigation-selection-example',
    standalone: true,
    imports: [FormsModule, ButtonComponent, SegmentedButtonComponent, FDB_NAVIGATION],
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
                            supportsSelection: true,
                            selected: true
                        },
                        {
                            title: 'Item 1.2',
                            icon: 'basket',
                            placement: 'start',
                            supportsSelection: true
                        },
                        {
                            title: 'Item 1.3',
                            icon: 'basket',
                            placement: 'start',
                            supportsSelection: true
                        },
                        {
                            title: 'Item 1.4',
                            icon: 'basket',
                            placement: 'start',
                            supportsSelection: true
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
                            supportsSelection: true
                        },
                        {
                            title: 'Item 2.2',
                            icon: 'basket',
                            placement: 'start',
                            supportsSelection: true
                        },
                        {
                            title: 'Item 2.3',
                            icon: 'basket',
                            placement: 'start',
                            supportsSelection: true
                        },
                        {
                            title: 'Item 2.4',
                            icon: 'basket',
                            placement: 'start',
                            supportsSelection: true
                        }
                    ]
                },
                {
                    title: 'Item 3',
                    icon: 'basket',
                    placement: 'start',
                    supportsSelection: true
                },
                {
                    title: 'Item 4',
                    icon: 'basket',
                    placement: 'start',
                    supportsSelection: true
                },
                {
                    title: 'Item 5',
                    icon: 'basket',
                    placement: 'start',
                    supportsSelection: true
                },
                {
                    title: 'Item 6',
                    icon: 'basket',
                    placement: 'start',
                    supportsSelection: true
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
                            placement: 'start',
                            supportsSelection: true
                        },
                        {
                            title: 'Favourite Item 1.2',
                            icon: 'settings',
                            placement: 'start',
                            supportsSelection: true
                        },
                        {
                            title: 'Favourite Item 1.3',
                            icon: 'settings',
                            placement: 'start',
                            supportsSelection: true
                        },
                        {
                            title: 'Favourite Item 1.4',
                            icon: 'settings',
                            placement: 'start',
                            supportsSelection: true
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
                            placement: 'start',
                            supportsSelection: true
                        },
                        {
                            title: 'Favourite Item 2.2',
                            icon: 'settings',
                            placement: 'start',
                            supportsSelection: true
                        },
                        {
                            title: 'Favourite Item 2.3',
                            icon: 'settings',
                            placement: 'start',
                            supportsSelection: true
                        },
                        {
                            title: 'Favourite Item 2.4',
                            icon: 'settings',
                            placement: 'start',
                            supportsSelection: true
                        }
                    ]
                },
                {
                    title: 'Favourite Item 3',
                    icon: 'settings',
                    placement: 'start',
                    supportsSelection: true
                },
                {
                    title: 'Favourite Item 4',
                    icon: 'settings',
                    placement: 'start',
                    supportsSelection: true
                },
                {
                    title: 'Favourite Item 5',
                    icon: 'settings',
                    placement: 'start',
                    supportsSelection: true
                },
                {
                    title: 'Favourite Item 6',
                    icon: 'settings',
                    placement: 'start',
                    supportsSelection: true
                }
            ]
        },
        {
            title: 'Item 6',
            icon: 'create-entry-time',
            placement: 'end',
            supportsSelection: true
        }
    ];

    toggleSelection(item: ExampleNavigationItem): void {
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
