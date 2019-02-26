import { Component, Input } from '@angular/core';

@Component({
    selector: 'background-toggle',
    template: `
        <fd-toggle style="margin-bottom: 18px" [size]="'xs'" (checkedChange)="onChange()">Toggle background</fd-toggle>
    `,
    styles: [
    ]
})
export class ExampleBackgroundComponent {
    @Input()
    label: string;

    @Input()
    element: string;

    @Input()
    className: string;

    onChange() {
        const className = 'fd-has-background-color-background-1';
        if (this.label) {
            document.getElementById(this.label).classList.toggle(className);
        }
    }
}
