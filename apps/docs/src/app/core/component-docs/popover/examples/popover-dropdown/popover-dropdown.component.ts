import { Component } from '@angular/core';

@Component({
  selector: 'fd-popover-dropdown-example',
  templateUrl: './popover-dropdown.component.html',
  styleUrls: ['./popover-dropdown.component.scss']
})
export class PopoverDropdownComponent {

    menu = [
        'Option 1',
        'Option 2',
        'Option 3',
    ];
}
