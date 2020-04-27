import { Directive } from '@angular/core';

/**
 * The directive that represents a tile media container.
 * ```html
 * <div fd-tile-media>
 *      <span fd-identifier
 *            [size]="'m'"
 *            [glyph]="'home'"
 *            [transparent]="true"></span>
 * </div>
 * ```
 */
@Directive({
    // TODO to be discussed
    // tslint:disable-next-line:directive-selector
    selector: '[fd-tile-media]',
    host: {
        class: 'fd-tile__media'
    }
})
export class TileMediaDirective {}
