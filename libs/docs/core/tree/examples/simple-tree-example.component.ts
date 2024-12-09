import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DataSourceDirective } from '@fundamental-ngx/cdk/data-source';
import { CvaDirective } from '@fundamental-ngx/cdk/forms';
import { AvatarComponent } from '@fundamental-ngx/core/avatar';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { IconComponent } from '@fundamental-ngx/core/icon';
import { TreeItem, TreeModule } from '@fundamental-ngx/core/tree';

export interface AdditionalTreeItemData {
    title: string;
    icon: string;
}

@Component({
    selector: 'fd-simple-tree-example',
    templateUrl: './simple-tree-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [DataSourceDirective, CvaDirective, TreeModule, IconComponent, AvatarComponent, ButtonComponent]
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
