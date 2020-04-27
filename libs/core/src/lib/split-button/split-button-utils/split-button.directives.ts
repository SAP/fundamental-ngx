import { Directive, EmbeddedViewRef, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';

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
@Directive({
    // TODO to be discussed
    // tslint:disable-next-line:directive-selector
    selector: '[fd-split-button-action-title]'
})
export class SplitButtonActionTitle {}

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
@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[fd-split-button-menu]'
})
export class SplitButtonMenuDirective {}

/**
 * Not for external use. Portal to render the complex title template.
 */
@Directive({
    // TODO to be discussed
    // tslint:disable-next-line:directive-selector
    selector: '[fd-split-button-load-action-title]'
})
export class SplitButtonLoadActionTitle implements OnInit {
    @Input('fd-split-button-load-action-title')
    content: TemplateRef<any>;

    private contentRef: EmbeddedViewRef<any>;

    constructor(private viewRef: ViewContainerRef) {}

    ngOnInit(): void {
        this.viewRef.clear();
        this.contentRef = this.viewRef.createEmbeddedView(this.content);
    }
}
