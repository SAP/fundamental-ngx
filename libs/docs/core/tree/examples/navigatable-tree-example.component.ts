import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { DataSourceDirective } from '@fundamental-ngx/cdk/data-source';
import { CvaDirective } from '@fundamental-ngx/cdk/forms';
import { IconComponent } from '@fundamental-ngx/core/icon';
import { TreeItem, TreeModule } from '@fundamental-ngx/core/tree';

export interface AdditionalTreeItemData {
    title: string;
    icon: string;
}

@Component({
    selector: 'fd-navigatable-tree-example',
    templateUrl: './navigatable-tree-example.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [DataSourceDirective, CvaDirective, TreeModule, IconComponent]
})
export class NavigatableTreeExampleComponent {
    model: TreeItem<AdditionalTreeItemData>;
    items: Partial<TreeItem<AdditionalTreeItemData>>[] = [
        {
            navigatable: true,
            expanded: false,
            navigationIndicator: true,
            data: {
                icon: 'e-care',
                title: 'Item 1 (Level 1)'
            },
            children: [
                {
                    navigatable: true,
                    expanded: false,
                    data: {
                        icon: 'product',
                        title: 'Item 1 (Level 2)'
                    },
                    children: [
                        {
                            navigatable: false,
                            expanded: true,
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

    onClick(event: MouseEvent | KeyboardEvent, title: string): void {
        alert(`Item "${title} clicked with" ${event instanceof MouseEvent ? 'mouse click' : 'keyboard'}`);
    }
}
