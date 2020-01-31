import { Component, Input } from '@angular/core';

@Component({
    selector: 'background-toggle',
    template: `
    <label fd-form-label>
        Toggle background
    </label>
    <fd-toggle style="margin-bottom: 18px" (checkedChange)="onChange()"></fd-toggle>
    `
})
export class ExampleBackgroundComponent {
    @Input()
    label: string;

    @Input()
    element: string;

    @Input()
    className: string;

    onChange() {
        const className = 'fd-tile-example-background';
        if (this.label) {
            document.getElementById(this.label).classList.toggle(className);
        }
    }
}
