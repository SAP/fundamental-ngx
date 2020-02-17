import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { RtlService } from '@fundamental-ngx/core';

@Component({
    selector: 'rtl-toggle',
    template: `
        <fd-toggle [size]="'xs'" [(ngModel)]="isChecked" (ngModelChange)="onChange()">Simulate RTL</fd-toggle>
    `,
    encapsulation: ViewEncapsulation.None
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

    constructor(private rtlService: RtlService) {

    }

    ngOnInit() {
        if (this.label) {
            this.id = this.label + Date.now() + '-rtl';
        } else {
            this.id = Date.now() + 6 + '';
        }
    }

    onChange() {
        const dirValue = this.isChecked ? 'rtl' : 'ltr';
        this.rtlService.rtl.next(this.isChecked);

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
