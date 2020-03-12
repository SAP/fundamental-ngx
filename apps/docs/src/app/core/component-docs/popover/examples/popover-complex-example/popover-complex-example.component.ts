import { Component } from '@angular/core';

@Component({
  selector: 'fd-popover-complex-example',
  templateUrl: './popover-complex-example.component.html',
  styleUrls: ['./popover-complex-example.component.scss']
})
export class PopoverComplexExampleComponent {

    menu = [
        { text: 'Option 1', url: '#' },
        { text: 'Option 2', url: '#' },
        { text: 'Option 3', url: '#' }
    ];
}
