import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { RtlService } from '@fundamental-ngx/core';

let componentExampleUniqueId: number = 0;

@Component({
    selector: 'component-example',
    template: `
        <div class="fd-tile docs-component fd-tile-example-background" id="{{ id }}">
            <div class="fd-tile__content fd-tile-content-example">
                <div class="component-example__features">
                    <rtl-switch [label]="id2"></rtl-switch>
                    <background-switch [label]="id"></background-switch>
                </div>
                <div class="fd-doc-component" id="{{ id2 }}">
                    <ng-content></ng-content>
                </div>
            </div>
        </div>
    `,
    styleUrls: ['./component-example.component.scss'],
    providers: [RtlService],
    encapsulation: ViewEncapsulation.None
})
export class ComponentExampleComponent implements OnInit {
    id: string;
    id2: string;

    ngOnInit() {
        const exampleName: string = 'ex' + componentExampleUniqueId++;
        this.id = 'rtl-' + exampleName;
        this.id2 = 'background-' + exampleName;
    }
}
