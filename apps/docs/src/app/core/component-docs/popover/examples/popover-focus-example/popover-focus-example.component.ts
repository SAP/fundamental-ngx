import { Component } from '@angular/core';

@Component({
  selector: 'fd-popover-focus-example',
  templateUrl: './popover-focus-example.component.html',
})
export class PopoverFocusExampleComponent {
    list = [
        { text: 'Option 1', url: '#' },
        { text: 'Option 2', url: '#' },
        { text: 'Option 3', url: '#' }
    ];
}
