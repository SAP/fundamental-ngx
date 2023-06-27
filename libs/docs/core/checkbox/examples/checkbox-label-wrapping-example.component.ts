import { Component } from '@angular/core';

@Component({
    selector: 'fd-checkbox-label-wrapping-example',
    template: `
        <div>
            <fd-checkbox [wrapLabel]="true">
                LABEL WILL BE POSITIONED IN THE MIDDLE. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Corporis ea eos in porro quae ullam. Aliquid corporis doloribus exercitationem facilis hic illo labore
                laudantium quam reprehenderit sapiente, tempore voluptatibus voluptatum?
            </fd-checkbox>
        </div>
        <div>
            <fd-checkbox [wrapLabel]="true" valignLabel="top">
                LABEL WILL BE POSITIONED ON THE TOP. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis
                ea eos in porro quae ullam. Aliquid corporis doloribus exercitationem facilis hic illo labore laudantium
                quam reprehenderit sapiente, tempore voluptatibus voluptatum?
            </fd-checkbox>
        </div>
    `,
    styles: [
        `
            :host {
                display: flex;
                flex-direction: column;
                gap: 1rem;
            }
            div {
                max-width: 300px;
            }
        `
    ]
})
export class CheckboxLabelWrappingExampleComponent {}
