import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormLabelComponent } from '@fundamental-ngx/core/form';
import { SwitchComponent } from '@fundamental-ngx/core/switch';

@Component({
    selector: 'background-switch',
    template: `
        <label fd-form-label> Switch background </label>
        <fd-switch [style.margin-bottom.px]="18" (checkedChange)="onChange()"></fd-switch>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [FormLabelComponent, SwitchComponent]
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
