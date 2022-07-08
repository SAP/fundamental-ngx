import { Directive, TemplateRef } from '@angular/core';
import { OverflowExpand, OverflowExpandDirectiveContext } from '../interfaces/overflow-expand.interface';
import { FD_OVERFLOW_EXPAND } from '../tokens/overflow-expand.token';

/**
 * Structural directive which is responsible for rendering the "More" button and handling further logic.
 */
@Directive({
    selector: '[fdOverflowExpand]',
    providers: [
        {
            provide: FD_OVERFLOW_EXPAND,
            useExisting: OverflowExpandDirective
        }
    ]
})
export class OverflowExpandDirective implements OverflowExpand {
    /** @hidden */
    static ngTemplateContextGuard(
        dir: OverflowExpandDirective,
        ctx: OverflowExpandDirectiveContext
    ): ctx is OverflowExpandDirectiveContext {
        return true;
    }

    /** @hidden */
    constructor(public templateRef: TemplateRef<OverflowExpandDirectiveContext>) {}
}
