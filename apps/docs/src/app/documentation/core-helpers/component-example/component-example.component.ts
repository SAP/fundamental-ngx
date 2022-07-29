import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { DialogService } from '@fundamental-ngx/core/dialog';
import { RtlService } from '@fundamental-ngx/core/utils';
import { WizardDialogGeneratorService } from '@fundamental-ngx/platform/wizard-generator';

let componentExampleUniqueId = 0;

@Component({
    selector: 'component-example',
    template: `
        <div class="docs-tile docs-component" [class.docs-tile-example-background]="hasBackground" [id]="id">
            <div class="docs-tile__content docs-tile-content-example">
                <div class="component-example__features" fdCompact>
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
        WizardDialogGeneratorService
    ],
    encapsulation: ViewEncapsulation.None
})
export class ComponentExampleComponent implements OnInit {
    @Input()
    hasBackground = true;

    id: string;
    id2: string;

    ngOnInit(): void {
        const exampleName: string = 'ex' + componentExampleUniqueId++;
        this.id = 'rtl-' + exampleName;
        this.id2 = 'background-' + exampleName;
    }
}
