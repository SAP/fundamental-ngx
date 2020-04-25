import { Component, Directive, ViewEncapsulation } from '@angular/core';

/**
 * Tile level actions such as add, remove, delete, sort, etc.
 *
 * ```html
 * <fd-tile>
 *    <div fd-tile-actions>
 *        <button fd-button (click)="action()">Action</button>
 *    </div>
 * </fd-tile>
 * ```
 */
@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[fd-tile-actions]',
    host: {
        class: 'fd-tile__actions'
    }
})
export class TileActionsDirective {}
