import { Component, Input } from '@angular/core';

@Component({
    selector: 'background-toggle',
    template: `
    <fd-toggle style="margin-bottom: 18px" [size]="'xs'" (checkedChange)="onChange()">
    <label fd-form-label>
        Toggle background
    </label>
    </fd-toggle>
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
