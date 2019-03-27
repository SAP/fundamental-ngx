import { Component } from '@angular/core';

@Component({
    selector: 'fd-popover-programmatic-open-example',
    templateUrl: './popover-programmatic-open-example.component.html',
    styles: [`
        :host {
            display: flex;
            align-items: center;
            justify-content: space-evenly;
        }
        .fd-button {
            margin: 10px;
        }
    `]
})
export class PopoverProgrammaticOpenExampleComponent {

    isOpen: boolean = false;

}
