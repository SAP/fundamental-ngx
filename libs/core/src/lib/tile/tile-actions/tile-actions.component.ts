import { Component, ViewEncapsulation } from '@angular/core';

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
@Component({
    // tslint:disable-next-line:component-selector
    selector: '[fd-tile-actions]',
    host: {
        class: 'fd-tile__actions'
    },
    template: `<ng-content></ng-content>`,
    encapsulation: ViewEncapsulation.None
})
export class TileActionsComponent {}
