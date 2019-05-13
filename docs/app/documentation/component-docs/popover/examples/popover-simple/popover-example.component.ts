import { Component } from '@angular/core';

@Component({
    selector: 'fd-popover-example',
    templateUrl: './popover-example.component.html',
    styles: [`
        .fd-docs-flex-display-helper {
            display: flex;
            align-items: center;
            justify-content: space-around;
        }
    `]
})
export class PopoverExampleComponent {

    menu1 = [
        {text: 'Option 1', url: '#'},
        {text: 'Option 2', url: '#'},
        {text: 'Option 3', url: '#'}
    ];

    menu2 = [
        {text: 'Option 3', url: '#'},
        {text: 'Option 4', url: '#'},
        {text: 'Option 5', url: '#'}
    ];

}
