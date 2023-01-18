import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FocusableListItemFocusedEvent } from '@fundamental-ngx/cdk/utils';

@Component({
    selector: 'fundamental-ngx-focusable-list-default-example',
    templateUrl: './default-example.component.html',
    styles: [
        `
            [fdkFocusableList] {
                border: 1px dashed #dedede;
            }

            [fdkFocusableItem] {
                cursor: pointer;
                padding: 5px 7px;
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
    focusableItems = new Array(5).fill(undefined);
    selectedItemIndex = 2;

    itemFocused(event: FocusableListItemFocusedEvent): void {
        console.log(event);
    }
}
