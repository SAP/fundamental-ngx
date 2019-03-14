import { Component, Input, OnInit } from '@angular/core';
import Popper, { PopperOptions } from 'popper.js';

@Component({
    selector: 'fd-popover-placement-example',
    templateUrl: './popover-placement-example.component.html'
})
export class PopoverPlacementExampleComponent implements OnInit {

    @Input()
    options: PopperOptions = Popper.Defaults;

    menu1 = [
        {text: 'Option 1', url: '#'},
        {text: 'Option 2', url: '#'},
        {text: 'Option 3', url: '#'}
    ];

    ngOnInit() {
        this.options.placement = 'left-start';
    }

}
