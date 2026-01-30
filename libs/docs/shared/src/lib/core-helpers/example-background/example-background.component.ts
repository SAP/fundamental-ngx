import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FormLabelComponent } from '@fundamental-ngx/core/form';
import { SwitchComponent } from '@fundamental-ngx/core/switch';

import '@sap-ui/common-css/dist/sap-margin.css';

@Component({
    selector: 'background-switch',
    template: `
        <label fd-form-label for="fd-foc-background-switch">Switch background</label>
        <fd-switch id="fd-foc-background-switch" class="fd-margin-bottom--sm" (checkedChange)="onChange()"></fd-switch>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [FormLabelComponent, SwitchComponent]
})
export class ExampleBackgroundComponent {
    readonly label = input<string>();

    protected onChange(): void {
        const labelValue = this.label();
        if (labelValue) {
            document.getElementById(labelValue)?.classList.toggle('docs-tile-example-background');
        }
    }
}
