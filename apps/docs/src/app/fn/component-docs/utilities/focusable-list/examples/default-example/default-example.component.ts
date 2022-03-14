import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'fundamental-ngx-focusable-list-default-example',
    templateUrl: './default-example.component.html',
    styles: [
        `
            [fnFocusableList] {
                border: 1px dashed #dedede;
            }

            [fnFocusableItem] {
                cursor: pointer;
                padding: 5px 7px;
            }

            span[fnFocusableItem] {
                display: inline-block;
            }

            [fnFocusableItem]:focus {
                background-color: #dedede;
            }
        `
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DefaultExampleComponent {
    focusableItems = new Array(5).fill(undefined);
    selectedItemIndex = 2;

    constructor() {}
}
