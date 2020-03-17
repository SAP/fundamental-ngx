import { Directive } from '@angular/core';

/**
 * The left-aligned back button for the action bar.
 *
 * ```html
 * <div fd-action-bar>
 *     <div fd-action-bar-back>
 *         <button aria-label="back" fd-button [fdType]="'transparent'" [compact]="true" [glyph]="'nav-back'"></button>
 *     </div>
 * </div>
 * ```
 */
@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[fd-action-bar-back]',
    host: {
        class: 'fd-action-bar__back'
    }
})
export class ActionBarBackDirective { }
