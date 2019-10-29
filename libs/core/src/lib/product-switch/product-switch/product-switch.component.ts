import { Component, ViewEncapsulation } from '@angular/core';
import { PopoverComponent } from '../../popover/popover.component';

@Component({
    selector: 'fd-product-switch',
    templateUrl: './product-switch.component.html',
    styleUrls: ['./product-switch.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ProductSwitchComponent extends PopoverComponent {}
