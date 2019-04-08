import { Directive, EmbeddedViewRef, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';

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
@Directive({
    // TODO to be discussed
    // tslint:disable-next-line:directive-selector
    selector: '[fd-tab-title]'
})
export class TabTitleDirective {
}

/**
 * Not for external use. Portal to render the complex title template.
 */
@Directive({
    // TODO to be discussed
    // tslint:disable-next-line:directive-selector
    selector: '[fd-tab-load-title]'
})
export class TabLoadTitleDirective implements OnInit {
    @Input('fd-tab-load-title')
    content: TemplateRef<any>;

    private contentRef: EmbeddedViewRef<any>;

    constructor(private viewRef: ViewContainerRef) {}

    ngOnInit(): void {
        this.viewRef.clear();
        this.contentRef = this.viewRef.createEmbeddedView(this.content);
    }
}
