import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { PopoverComponent } from '../../popover/popover.component';
import { ProductSwitchItem } from '../product-switch-body/product-switch.item';

@Component({
    selector: 'fd-product-switch',
    templateUrl: './product-switch.component.html',
    styleUrls: ['./product-switch.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ProductSwitchComponent extends PopoverComponent {}
