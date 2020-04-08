import { Component } from '@angular/core';

@Component({
    selector: 'fd-popover-programmatic-open-example',
    templateUrl: './popover-programmatic-open-example.component.html',
    styleUrls: ['popover-programmatic-open-example.component.scss']
})
export class PopoverProgrammaticOpenExampleComponent {
    isOpen: boolean = false;

    list = ['Option 1', 'Option 2', 'Option 3'];
}
