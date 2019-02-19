import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'rtl-toggle',
    template: `
        <fd-toggle [size]="'xs'" [(ngModel)]="isChecked" (ngModelChange)="onChange()">Simulate RTL</fd-toggle>
    `
})
export class DirectionalityComponent implements OnInit {
    id: string;
    isChecked: boolean = false;
    @Input()
    label: string;

    @Input()
    element: string;

    @Input()
    className: string;

    ngOnInit() {
        if (this.label) {
            this.id = this.label + Date.now() + '-rtl';
        } else {
            this.id = Date.now() + 6 + '';
        }
    }

    onChange() {
        const dirValue = this.isChecked ? 'rtl' : 'ltr';
        if (this.className) {
            Array.from(document.getElementsByClassName(this.className)).forEach(
                (element: HTMLElement) => (element.dir = dirValue)
            );
        }
        if (this.element) {
            Array.from(document.getElementsByTagName(this.element)).forEach(
                (element: HTMLElement) => (element.dir = dirValue)
            );
        }
        if (this.label) {
            document.getElementById(this.label).dir = dirValue;
        }
    }
}
