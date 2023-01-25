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

            [fdkFocusableItem]:focus,
            [fdkFocusableItem] *:focus {
                outline-color: var(--sapContent_FocusColor);
                outline-offset: -0.1875rem;
                outline-style: var(--sapContent_FocusStyle);
                outline-width: var(--sapContent_FocusWidth);
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
