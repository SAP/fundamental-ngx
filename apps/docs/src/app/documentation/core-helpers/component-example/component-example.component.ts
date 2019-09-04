import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

declare let hljs: any;

@Component({
    selector: 'component-example',
    template: `
        <div class="fd-tile docs-component docs-component__ fd-has-background-color-background-1" id="{{id}}">
            <div class="fd-tile__content fd-tile-content-example">
                <div class="component-example__features">
                    <rtl-toggle [label]="id2"></rtl-toggle>
                    <background-toggle [label]="id"></background-toggle>
                </div>
                <div class="fd-doc-component" id="{{id2}}">
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

            rtl-toggle {
                padding-right: 20px;
            }

            .fd-tile-content-example {
                padding: 20px;
            }
        `
    ]
})
export class ComponentExampleComponent implements OnInit {
    @Input()
    name: string;

    id: string;
    id2: string;

    constructor(private element: ElementRef, private activatedRoute: ActivatedRoute) {
    }

    ngOnInit() {
        this.id = '' + Date.now() + '_wrapper_' + this.name;
        this.id2 = '' + Date.now() + this.name;
    }


}
