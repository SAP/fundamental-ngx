import { Component, Input } from '@angular/core';

@Component({
    selector: 'rtl-toggle',
    template: `
        <span class="rtl-toggle--wrapper">
            <label class="fd-form__label " for="{{id}}">
            <span class="fd-toggle fd-toggle--xs fd-form__control">
                <input type="checkbox" name="" value="" id="{{id}}" class="toggle-rtl {{id}}" [attr.aria-controls]="label" (change)="onChange($event)" [(ngModel)]="isChecked">
                <span class="fd-toggle__switch" role="presentation"></span>
            </span>
            Simulate RTL
            </label>  
        </span>`,
    styles: [
        `
            .rtl-toggle--wrapper {
                display: inline-block;
            }
        `
    ]
})
export class DirectionalityComponent {
    id = Date.now() + 1 + '';
    isChecked: boolean = false;
    @Input()
    label: string;

    @Input()
    element: string;

    @Input()
    className: string;

    onChange(event) {
        let dirValue = this.isChecked ? 'rtl' : 'ltr';
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
