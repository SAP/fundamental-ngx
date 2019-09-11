import { Component, ViewEncapsulation } from '@angular/core';

/**
 * The component that represents a tile media container. 
 * ```html
 * <div fd-tile-media>
 *      <span fd-identifier
 *            [size]="'m'"
 *            [glyph]="'home'"
 *            [transparent]="true"></span>
 * </div>
 * ```
 */
@Component({
    // TODO to be discussed
    // tslint:disable-next-line:component-selector
    selector: '[fd-tile-media]',
    host: {
        class: 'fd-tile__media'
    },
    template: `<ng-content></ng-content>`,
    encapsulation: ViewEncapsulation.None
})
export class TileMediaComponent {}
