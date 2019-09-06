import { OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
/**
 * Directive used to identify the template which will populate the main action button.
 * Used to achieve complex buttons that require more than a string.
 *```html
 *    <fd-button-split>
 *        <ng-template fd-button-split-action-title>
 *            <p>Paragraph 1</p>
 *            <p>Paragraph 2</p>
 *        </ng-template>
 *        <div fd-button-split-menu>
 *            <fd-menu>
 *                <ul fd-menu-list>
 *                    <li fd-menu-item>
 *                       <a [routerLink]="'/'">option</a>
 *                    </li>
 *                    <li fd-menu-item>
 *                       <a [routerLink]="'/'">option2</a>
 *                    </li>
 *                </ul>
 *            </fd-menu>
 *        </div>
 *    </fd-button-split>
 *</fd-button-split>
 *```
 */
export declare class SplitButtonActionTitle {
}
/**
 *   Directive used to specify menu list of items for dropdown.
 *```html
 *    <fd-button-split>
 *        Action Button
 *        <div fd-button-split-menu>
 *            <fd-menu>
 *                <ul fd-menu-list>
 *                    <li fd-menu-item>
 *                       <a [routerLink]="'/'">option</a>
 *                    </li>
 *                    <li fd-menu-item>
 *                       <a [routerLink]="'/'">option2</a>
 *                    </li>
 *                </ul>
 *            </fd-menu>
 *        </div>
 *    </fd-button-split>
 *</fd-button-split>
 *```
 */
export declare class SplitButtonMenuDirective {
}
/**
 * Not for external use. Portal to render the complex title template.
 */
export declare class SplitButtonLoadActionTitle implements OnInit {
    private viewRef;
    content: TemplateRef<any>;
    private contentRef;
    constructor(viewRef: ViewContainerRef);
    ngOnInit(): void;
}
