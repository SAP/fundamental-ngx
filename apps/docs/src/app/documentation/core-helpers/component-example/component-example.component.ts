import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NotificationService } from '@fundamental-ngx/core/notification';
import { DialogService } from '@fundamental-ngx/core/dialog';
import { RtlService } from '@fundamental-ngx/core/utils';

let componentExampleUniqueId = 0;

@Component({
    selector: 'component-example',
    template: `
        <div class="docs-tile docs-component docs-tile-example-background" [id]="id">
            <div class="docs-tile__content docs-tile-content-example">
                <div class="component-example__features">
                    <rtl-switch [label]="id2"></rtl-switch>
                    <background-switch [label]="id"></background-switch>
                </div>
                <div class="fd-doc-component" [id]="id2">
                    <ng-content></ng-content>
                </div>
            </div>
        </div>
    `,
    styleUrls: ['./component-example.component.scss'],
    providers: [
        RtlService,
        // Needed in order for dialog service and components to inherit local rtl service.
        DialogService,
        NotificationService
    ],
    encapsulation: ViewEncapsulation.None
})
export class ComponentExampleComponent implements OnInit {
    id: string;
    id2: string;

    ngOnInit(): void {
        const exampleName: string = 'ex' + componentExampleUniqueId++;
        this.id = 'rtl-' + exampleName;
        this.id2 = 'background-' + exampleName;
    }
}
