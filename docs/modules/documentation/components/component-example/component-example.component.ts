import { Component, ElementRef, Input } from '@angular/core';

declare let hljs: any;

@Component({
    selector: 'component-example',
    template: `
        <div class="fd-tile docs-component docs-component__ fd-has-background-color-background-1" id="{{id}}">
            <div class="fd-tile__content">
                <div class="component-example__features">
                    <rtl-toggle className="fd-doc-component"></rtl-toggle>
                    <background-toggle [label]="id"></background-toggle>
                </div>
                <div class="fd-doc-component">
                    <ng-content></ng-content>
                </div>
            </div>
        </div>
    `,
    styles: [
        `
            .component-example__features {
                display: flex;
                justify-content: flex-start;
            }

            background-toggle {
                padding-left: 20px;
            }
        `
    ]
})
export class ComponentExampleComponent {
    constructor(private element: ElementRef) {}

    id = Date.now() + 13 + '';
}
