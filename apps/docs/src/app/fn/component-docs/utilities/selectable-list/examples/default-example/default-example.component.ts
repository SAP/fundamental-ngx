import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'fundamental-ngx-selectable-list-default-example',
    templateUrl: './default-example.component.html',
    styles: [
        `
            [fnSelectableList] {
                border: 1px dashed #dedede;
            }

            [fnSelectableItem] {
                cursor: pointer;
            }

            [fnSelectableItem].selected {
                background-color: #dedede;
            }
        `
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DefaultExampleComponent {
    selectableItems = new Array(5).fill(undefined);
    selectedItemIndex = 2;

    constructor() {}
}
