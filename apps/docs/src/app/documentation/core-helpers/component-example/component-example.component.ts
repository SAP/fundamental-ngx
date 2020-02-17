import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { RtlService } from '@fundamental-ngx/core';

@Component({
    selector: 'component-example',
    template: `
        <div class="fd-tile docs-component fd-tile-example-background" id="{{id}}">
            <div class="fd-tile__content fd-tile-content-example">
                <div class="component-example__features">
                    <rtl-switch [label]="id2"></rtl-switch>
                    <background-switch [label]="id"></background-switch>
                </div>
                <div class="fd-doc-component" id="{{id2}}">
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
    @Input()
    name: string;

    id: string;
    id2: string;

    ngOnInit() {
        this.id = '' + Date.now() + '_wrapper_' + this.name;
        this.id2 = '' + Date.now() + this.name;
    }


}
