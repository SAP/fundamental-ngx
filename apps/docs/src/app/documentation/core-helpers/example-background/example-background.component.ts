import { Component, Input } from '@angular/core';

@Component({
    selector: 'background-switch',
    template: `
        <label fd-form-label> Switch background </label>
        <fd-switch [compact]="true" style="margin-bottom: 18px" (checkedChange)="onChange()"></fd-switch>
    `
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
