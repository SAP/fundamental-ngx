import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'fundamental-ngx-focusable-grid-short-rows-default-example',
    templateUrl: './short-rows-example.component.html',
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
export class ShortRowsExampleComponent {
    constructor() {}
}
