import { Directive, Input, OnChanges, SimpleChanges, TemplateRef, ViewContainerRef } from '@angular/core';
import {
    DeprecatedSelector,
    FD_DEPRECATED_DIRECTIVE_SELECTOR,
    getDeprecatedModel
} from '../../deprecated-selector.class';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fdRepeat]',
    standalone: true,
    providers: [
        {
            provide: FD_DEPRECATED_DIRECTIVE_SELECTOR,
            useValue: getDeprecatedModel('[fdkRepeat]', '[fdRepeat]')
        }
    ]
})
export class DeprecatedRepeatDirective extends DeprecatedSelector {}

/**
 * Directive to repeatably render template N times.
 */
@Directive({
    selector: '[fdkRepeat], [fdRepeat]',
    standalone: true
})
export class RepeatDirective implements OnChanges {
    /** Number of times to render a template. */
    @Input('fdkRepeat')
    count: number;

    /**
     * Deprecated fdRepeat input property. Use `[fdkRepeat]`.
     */
    @Input('fdRepeat')
    deprecatedCount: number;

    /** @hidden */
    private get _repeatCount(): number {
        return this.count || this.deprecatedCount;
    }

    /** @hidden */
    constructor(
        private readonly _templateRef: TemplateRef<any>,
        private readonly _viewContainerRef: ViewContainerRef
    ) {}

    /** @hidden */
    ngOnChanges(changes: SimpleChanges): void {
        if ((changes['count'] || changes['deprecatedCount']) && Number.isInteger(this._repeatCount)) {
            this._viewContainerRef.clear();

            for (let index = 0; index < Math.max(0, this._repeatCount); index++) {
                this._viewContainerRef.createEmbeddedView(this._templateRef, { index });
            }
        }
    }
}
