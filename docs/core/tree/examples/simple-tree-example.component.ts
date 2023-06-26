import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TreeItem } from '@fundamental-ngx/core/tree';

export interface AdditionalTreeItemData {
    title: string;
    icon: string;
}

@Component({
    selector: 'fd-simple-tree-example',
    templateUrl: './simple-tree-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SimpleTreeExampleComponent {
    model: TreeItem<AdditionalTreeItemData>;
    items: Partial<TreeItem<AdditionalTreeItemData>>[] = [
        {
            navigatable: true,
            expanded: false,
            data: {
                icon: 'e-care',
                title: 'Item 1 (Level 1)'
            },
            children: [
                {
                    expanded: false,
                    data: {
                        icon: 'product',
                        title: 'Item 1 (Level 2)'
                    },
                    children: [
                        {
                            expanded: true,
                            data: {
                                icon: 'competitor',
                                title: 'Item 1 (Level 3)'
                            },
                            children: [
                                {
                                    expanded: true,
                                    data: {
                                        icon: 'competitor',
                                        title: 'Item 1 (Level 4)'
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
                title: 'Item 1(Level 1)'
            }
        }
    ];
}
