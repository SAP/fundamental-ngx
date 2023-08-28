import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormLabelModule } from '@fundamental-ngx/core/form';
import { SwitchModule } from '@fundamental-ngx/core/switch';

@Component({
    selector: 'background-switch',
    template: `
        <label fd-form-label> Switch background </label>
        <fd-switch style="margin-bottom: 18px" (checkedChange)="onChange()"></fd-switch>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [FormLabelModule, SwitchModule]
})
export class ExampleBackgroundComponent {
    @Input()
    label: string;

    @Input()
    element: string;

    @Input()
    className: string;

    onChange(): void {
        const className = 'docs-tile-example-background';
        if (this.label) {
            document.getElementById(this.label)?.classList.toggle(className);
        }
    }
}
