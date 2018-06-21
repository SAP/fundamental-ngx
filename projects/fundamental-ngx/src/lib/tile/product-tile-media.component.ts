import { Component, Input } from '@angular/core';

@Component({
    selector: 'fd-product-tile-media',
    templateUrl: './product-tile-media.component.html'
})
export class ProductTileMediaComponent {
    @Input() photo: string;
}
