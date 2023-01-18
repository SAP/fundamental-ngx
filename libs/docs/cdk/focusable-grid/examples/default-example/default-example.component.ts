import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FocusableItemPosition } from '@fundamental-ngx/cdk/utils';

@Component({
    selector: 'fundamental-ngx-focusable-grid-default-example',
    templateUrl: './default-example.component.html',
    styles: [
        `
            [fdkFocusableList] {
                display: flex;
            }

            [fdkFocusableItem] {
                flex-grow: 1;
                cursor: pointer;
                padding: 5px 7px;
                border: 1px dashed #dedede;
            }

            [fdkFocusableItem] a {
                margin: 0 0.25rem;
            }

            span[fdkFocusableItem] {
                display: inline-block;
            }

            [fdkFocusableItem]:focus {
                background-color: #dedede;
            }
        `
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DefaultExampleComponent {
    constructor() {}

    itemFocused(position: FocusableItemPosition): void {
        console.log(position);
    }
}
