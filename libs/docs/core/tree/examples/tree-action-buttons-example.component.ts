import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { TreeItem } from '@fundamental-ngx/core/tree';

interface AdditionalTreeItemData {
    title: string;
    editable: boolean;
    icon: string;
}
@Component({
    selector: 'fd-tree-action-buttons-example',
    templateUrl: './tree-action-buttons-example.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TreeActionButtonsExampleComponent {
    model: TreeItem<AdditionalTreeItemData>;
    items: Partial<TreeItem<AdditionalTreeItemData>>[] = [
        {
            navigatable: true,
            expanded: false,
            state: 'success',
            navigationIndicator: true,
            data: {
                icon: 'e-care',
                title: 'Item 1 (Level 1)',
                editable: true
            },
            children: [
                {
                    navigatable: true,
                    expanded: false,
                    state: 'error',
                    data: {
                        icon: 'product',
                        title: 'Item 1 (Level 2)',
                        editable: false
                    },
                    children: [
                        {
                            navigatable: false,
                            expanded: true,
                            state: 'warning',
                            data: {
                                icon: 'competitor',
                                title: 'Item 1 (Level 3)',
                                editable: true
                            },
                            children: [
                                {
                                    navigatable: false,
                                    expanded: true,
                                    state: 'default',
                                    data: {
                                        icon: 'competitor',
                                        title: 'Item 1 (Level 4)',
                                        editable: false
                                    }
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            navigatable: true,
            expanded: true,
            data: {
                icon: 'e-care',
                title: 'Item 1(Level 1)',
                editable: false
            }
        }
    ];
}
