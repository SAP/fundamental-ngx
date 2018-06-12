import { Component, Input } from '@angular/core';

@Component({
    selector: 'fd-product-tile',
    host: {
        '[class]': ' "fd-product-tile" + (disabled ? " is-disabled" : "")',
        '[attr.role]': "(this.isButton === true ? 'button' : '')"
    },
    templateUrl: './product-tile.component.html'
})
export class ProductTileComponent {
    @Input() disabled: boolean = false;

    @Input() isButton: boolean = false;
}
