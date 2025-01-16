import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SelectableItemDirective, SelectableListDirective } from '@fundamental-ngx/cdk/utils';
import { CustomSelectableItemDirective } from './custom-selectable-item.directive';

@Component({
    selector: 'fdk-selectable-list-advanced-usage',
    templateUrl: './advanced-usage.component.html',
    styles: [
        `
            [fdkSelectableList] {
                border: 1px dashed #dedede;
            }

            [fdkSelectableItem] {
                cursor: pointer;
            }

            [fdkSelectableItem].item-is-selected {
                background-color: #dedede;
            }
        `
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [SelectableListDirective, SelectableItemDirective, CustomSelectableItemDirective]
})
export class AdvancedUsageComponent {
    items = [1, 2, 3, 4, 5];

    constructor() {}
}
