import { Component, Input } from '@angular/core';

@Component({
    selector: 'background-toggle',
    template: `
        <span class="background-toggle--wrapper">
            <label class="fd-form__label " for="{{id}}">
            <span class="fd-toggle fd-toggle--xs fd-form__control">
                <input type="checkbox" name="" value="" id="{{id}}" class="{{id}}" [attr.aria-controls]="label" (change)="onChange($event)" [(ngModel)]="isChecked">
                <span class="fd-toggle__switch" role="presentation"></span>
            </span>
            Toggle background
            </label>  
        </span>`,
    styles: [
        `
            .background-toggle--wrapper {
                display: inline-block;
            }
        `
    ]
})
export class ExampleBackgroundComponent {
    id = Date.now() + 1234 + '';
    isChecked: boolean = false;
    @Input()
    label: string;

    @Input()
    element: string;

    @Input()
    className: string;

    onChange(event) {
        const className = 'fd-has-background-color-background-1';
        if (this.label) {
            document.getElementById(this.label).classList.toggle(className);
        }
    }
}
