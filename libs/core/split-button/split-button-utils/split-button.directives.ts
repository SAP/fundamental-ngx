import { Directive } from '@angular/core';

/**
 * Directive used to identify the template which will populate the main action button.
 * Used to achieve complex buttons that require more than a string.
 *```html
 *    <fd-button-split>
 *        <ng-template fd-button-split-action-title>
 *            <p>Paragraph 1</p>
 *            <p>Paragraph 2</p>
 *        </ng-template>
 *        <fd-menu>
 *             <li fd-menu-item>
 *               <a fd-menu-interactive [routerLink]="'/'">
 *                   <span fd-menu-title>option2</span>
 *               </a>
 *            </li>
 *            <li fd-menu-item>
 *               <a fd-menu-interactive [routerLink]="'/'">
 *                   <span fd-menu-title>option2</span>
 *               </a>
 *            </li>
 *        </fd-menu>
 *    </fd-button-split>
 *</fd-button-split>
 *```
 */
@Directive({
    // TODO to be discussed
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fd-split-button-action-title]',
    standalone: true
})
export class SplitButtonActionTitle {}
