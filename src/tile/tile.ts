import { Component, Directive, Input } from '@angular/core';

@Component({
    selector: 'fd-tile',
    host: {
        '[class]':
            ' "fd-tile" + (disabled ? " is-disabled" : "") + (rowSpan ? " fd-has-grid-row-span-" + rowSpan : "")  + (columnSpan ? " fd-has-grid-column-span-" + columnSpan : "") + (colorAccent ? " fd-has-background-color-accent-" + colorAccent : "")',
        '[attr.role]': "(this.isButton === true ? 'button' : '')"
    },
    template: `
      <ng-content select="fd-tile-media"></ng-content>
      <ng-content select="fd-tile-content"></ng-content>
      <ng-content select="fd-tile-title"></ng-content>
      <ng-content></ng-content>
  `
})
export class Tile {
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
export class TileContent {}

@Component({
    selector: 'fd-tile-title',
    template: `
    <h2 class="fd-tile__title"><ng-content></ng-content></h2>
  `
})
export class TileTitle {}

@Directive({
    selector: 'fd-tile-media',
    host: {
        class: 'fd-tile__media'
    }
})
export class TileMedia {}

@Component({
    selector: 'fd-tile-actions',
    template: `
    <div class="fd-tile__actions">
      <ng-content select="fd-dropdown"></ng-content>
    </div>
  `
})
export class TileActions {}

@Component({
    selector: 'fd-product-tile',
    host: {
        '[class]': ' "fd-product-tile" + (disabled ? " is-disabled" : "")',
        '[attr.role]': "(this.isButton === true ? 'button' : '')"
    },
    template: `
      <ng-content select="fd-product-tile-media"></ng-content>
      <ng-content select="fd-product-tile-content"></ng-content>
      <ng-content select="fd-product-tile-title"></ng-content>
      <ng-content></ng-content>
  `
})
export class ProductTile {
    @Input() disabled: boolean = false;

    @Input() isButton: boolean = false;
}

@Component({
    selector: 'fd-product-tile-media',
    template: `
    <div class="fd-product-tile__media" [ngStyle]="{'background-image': 'url(' + photo + ')'}"></div>
  `
})
export class ProductTileMedia {
    @Input() photo: string;
}

@Component({
    selector: 'fd-product-tile-content',
    template: `
    <div class="fd-product-tile__content"><ng-content></ng-content></div>
  `
})
export class ProductTileContent {}

@Component({
    selector: 'fd-product-tile-title',
    template: `
    <h2 class="fd-product-tile__title"><ng-content></ng-content></h2>
  `
})
export class ProductTileTitle {}

@Directive({
    selector: 'fd-tile-grid',
    host: {
        '[class]': '"fd-tile-grid" + (col ? "  fd-tile-grid--" + col + "col" : "") '
    }
})
export class TileGrid {
    @Input() col;
}
