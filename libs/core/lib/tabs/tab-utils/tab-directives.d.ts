import { OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
/**
 * Directive used to identify the template which will populate the tab header.
 * Used to achieve complex headers that require more than a string.
 *
 * ```html
 * <fd-tab>
 *      <ng-template fd-tab-title>
 *          <fd-icon [glyph]="'delete'"></fd-icon>
 *          <span>Tab Label</span>
 *      </ng-template>
 * </fd-tab>
 * ```
 */
export declare class TabTitleDirective {
}
/**
 * Not for external use. Portal to render the complex title template.
 */
export declare class TabLoadTitleDirective implements OnInit {
    private viewRef;
    content: TemplateRef<any>;
    private contentRef;
    constructor(viewRef: ViewContainerRef);
    ngOnInit(): void;
}
