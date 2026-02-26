import { Directive, Input, OnChanges, SimpleChanges, TemplateRef, ViewContainerRef } from '@angular/core';

/**
 * Directive to repeatably render template N times.
 *
 * @deprecated Use Angular's built-in `@for` control flow with the `range()` utility function instead.
 * Example: `@for (i of range(3); track i) { <div>Item {{ i }}</div> }`
 * This directive will be removed in a future major version.
 */
@Directive({
    selector: '[fdkRepeat]',
    standalone: true
})
export class RepeatDirective implements OnChanges {
    /** Number of times to render a template. */
    @Input('fdkRepeat')
    count: number;

    /** @hidden */
    constructor(
        private readonly _templateRef: TemplateRef<any>,
        private readonly _viewContainerRef: ViewContainerRef
    ) {}

    /** @hidden */
    ngOnChanges(changes: SimpleChanges): void {
        if ((changes['count'] || changes['deprecatedCount']) && Number.isInteger(this.count)) {
            this._viewContainerRef.clear();

            for (let index = 0; index < Math.max(0, this.count); index++) {
                this._viewContainerRef.createEmbeddedView(this._templateRef, { index });
            }
        }
    }
}
