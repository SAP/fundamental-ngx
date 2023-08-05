import { Directive, Input, OnChanges, SimpleChanges, TemplateRef, ViewContainerRef } from '@angular/core';

/**
 * Directive to repeatably render template N times.
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
