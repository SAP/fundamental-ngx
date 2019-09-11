import { Component, ViewEncapsulation } from '@angular/core';

/**
 * Component that represents a tile content. 
 * ```html
 * <div fd-tile-content>
 *    <h2 fd-tile-title>Tile Tile</h2>
 *    <p>Tile Description</p>
 * </div>
 * ```
 */
@Component({
    // TODO to be discussed
    // tslint:disable-next-line:component-selector
    selector: '[fd-tile-content]',
    host: {
        class: 'fd-tile__content'
    },
    template: `<ng-content></ng-content>`,
    encapsulation: ViewEncapsulation.None
})
export class TileContentComponent {}
