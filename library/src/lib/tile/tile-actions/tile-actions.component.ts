import { Component } from '@angular/core';

/**
 * Tile level actions such as add, remove, delete, sort, etc.
 * 
 * ```html
 * <fd-tile>
 *    <fd-tile-actions>
 *        <button fd-button (click)="action()">Action</button>
 *    </fd-tile-actions>
 * </fd-tile>
 * ```
 */
@Component({
    selector: 'fd-tile-actions',
    templateUrl: './tile-actions.component.html'
})
export class TileActionsComponent {}
