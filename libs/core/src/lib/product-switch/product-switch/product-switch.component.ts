import { ChangeDetectionStrategy, Component, ViewEncapsulation, Input } from '@angular/core';
import { PopoverComponent } from '../../popover/popover.component';
import {Placement} from 'popper.js';

@Component({
    selector: 'fd-product-switch',
    templateUrl: './product-switch.component.html',
    styleUrls: ['./product-switch.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductSwitchComponent extends PopoverComponent {
    @Input () 
    placement: Placement = 'bottom-end'


    /**Input to set the aria label */
    @Input ()
    ariaLabel: string = 'popover-button';
}
