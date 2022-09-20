import { Directive, Input, OnChanges, SimpleChanges, TemplateRef, ViewContainerRef } from '@angular/core';

/**
 * Directive to repeatably render template N times.
 */
@Directive({
    selector: '[fdRepeat]'
})
export class RepeatDirective implements OnChanges {
    /** Number of times to render a template. */
    @Input('fdRepeat')
    readonly count: number = 0;

    /** @hidden */
    constructor(private templateRef: TemplateRef<any>, private viewContainerRef: ViewContainerRef) {}

    /** @hidden */
    ngOnChanges(changes: SimpleChanges): void {
        if (changes['count'] && Number.isInteger(this.count)) {
            this.viewContainerRef.clear();

            for (let index = 0; index < Math.max(0, this.count); index++) {
                this.viewContainerRef.createEmbeddedView(this.templateRef, { index });
            }
        }
    }
}
