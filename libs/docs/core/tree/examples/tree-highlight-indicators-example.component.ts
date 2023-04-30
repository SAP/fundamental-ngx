import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { TreeItem } from '@fundamental-ngx/core/tree';

interface AdditionalTreeItemData {
    title: string;
    icon: string;
}

@Component({
    selector: 'fd-tree-highlight-indicators-example',
    templateUrl: './tree-highlight-indicators-example.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TreeHighlightIndicatorsExampleComponent {
    model: TreeItem<AdditionalTreeItemData>;
    items: Partial<TreeItem<AdditionalTreeItemData>>[] = [
        {
            navigatable: true,
            expanded: false,
            state: 'success',
            navigationIndicator: true,
            data: {
                icon: 'e-care',
                title: 'Item 1 (Level 1)'
            },
            children: [
                {
                    navigatable: true,
                    expanded: false,
                    state: 'error',
                    data: {
                        icon: 'product',
                        title: 'Item 1 (Level 2)'
                    },
                    children: [
                        {
                            navigatable: false,
                            expanded: true,
                            state: 'warning',
                            data: {
                                icon: 'competitor',
                                title: 'Item 1 (Level 3)'
                            },
                            children: [
                                {
                                    navigatable: false,
                                    expanded: true,
                                    state: 'default',
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
