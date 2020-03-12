import { ChangeDetectionStrategy, Component, ViewEncapsulation, Input } from '@angular/core';
import { PopoverComponent } from '../../popover/popover.component';
import { LabelComponent } from '../../badge-label/public_api';
let uniqueid = 0;
@Component({
    selector: 'fd-product-switch',
    templateUrl: './product-switch.component.html',
    styleUrls: ['./product-switch.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductSwitchComponent extends PopoverComponent {
    @Input() ariaLabel: string = 'button' + uniqueid++;
}
