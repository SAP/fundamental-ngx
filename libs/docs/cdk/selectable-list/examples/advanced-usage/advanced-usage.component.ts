import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'fundamental-ngx-selectable-list-advanced-usage',
    templateUrl: './advanced-usage.component.html',
    styles: [
        `
            [fdSelectableList] {
                border: 1px dashed #dedede;
            }

            [fnSelectableItem] {
                cursor: pointer;
            }

            [fnSelectableItem].item-is-selected {
                background-color: #dedede;
            }
        `
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdvancedUsageComponent {
    items = [1, 2, 3, 4, 5];

    constructor() {}
}
