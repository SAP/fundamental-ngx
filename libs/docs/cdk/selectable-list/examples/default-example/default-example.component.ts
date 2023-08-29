import { NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SelectableItemDirective, SelectableListDirective } from '@fundamental-ngx/cdk/utils';

@Component({
    selector: 'fundamental-ngx-selectable-list-default-example',
    templateUrl: './default-example.component.html',
    styles: [
        `
            [fdkSelectableList] {
                border: 1px dashed #dedede;
            }

            [fdkSelectableItem] {
                cursor: pointer;
            }

            [fdkSelectableItem].selected {
                background-color: #dedede;
            }
        `
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [SelectableListDirective, NgFor, SelectableItemDirective]
})
export class DefaultExampleComponent {
    selectableItems = new Array(5).fill(undefined);
    selectedItemIndex = 2;
    multipleSelectionValues = [1, 4];
    toggleSelectionValues = [2, 3];

    constructor() {}
}
