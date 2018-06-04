import { Component, Directive, Input } from '@angular/core';

@Component({
    selector: 'fd-tile',
    host: {
        '[class]':
            ' "fd-tile" + (disabled ? " is-disabled" : "") + (rowSpan ? " fd-has-grid-row-span-" + rowSpan : "")  + (columnSpan ? " fd-has-grid-column-span-" + columnSpan : "") + (colorAccent ? " fd-has-background-color-accent-" + colorAccent : "")',
        '[attr.role]': "(this.isButton === true ? 'button' : '')"
    },
    templateUrl: './tile.component.html'
})
export class TileComponent {
    @Input() disabled: boolean = false;

    @Input() isButton: boolean = false;

    @Input() rowSpan;

    @Input() columnSpan;

    @Input() colorAccent;
}

@Directive({
    selector: 'fd-tile-content',
    host: {
        class: 'fd-tile__content'
    }
})
export class TileContentDirective {}

@Component({
    selector: 'fd-tile-title',
    templateUrl: './tile-title.component.html'
})
export class TileTitleComponent {}

@Directive({
    selector: 'fd-tile-media',
    host: {
        class: 'fd-tile__media'
    }
})
export class TileMediaDirective {}

@Component({
    selector: 'fd-tile-actions',
    templateUrl: './tile-actions.component.html'
})
export class TileActionsComponent {}

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

@Component({
    selector: 'fd-product-tile-media',
    templateUrl: './product-tile-media.component.html'
})
export class ProductTileMediaComponent {
    @Input() photo: string;
}

@Component({
    selector: 'fd-product-tile-content',
    templateUrl: './product-tile-content.component.html'
})
export class ProductTileContentComponent {}

@Component({
    selector: 'fd-product-tile-title',
    templateUrl: './product-tile-title.component.html'
})
export class ProductTileTitleComponent {}

@Directive({
    selector: 'fd-tile-grid',
    host: {
        '[class]': '"fd-tile-grid" + (col ? "  fd-tile-grid--" + col + "col" : "") '
    }
})
export class TileGridDirective {
    @Input() col;
}
