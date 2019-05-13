import { Directive } from '@angular/core';

/**
 * The directive that represents a tile media container. 
 * ```html
 * <fd-tile-media>
 *      <span fd-identifier
 *            [size]="'m'"
 *            [glyph]="'home'"
 *            [transparent]="true"></span>
 * </fd-tile-media>
 * ```
 */
@Directive({
    // TODO to be discussed
    // tslint:disable-next-line:directive-selector
    selector: 'fd-tile-media',
    host: {
        class: 'fd-tile__media'
    }
})
export class TileMediaDirective {}
