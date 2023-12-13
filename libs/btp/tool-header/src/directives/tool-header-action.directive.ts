import { ContentChild, Directive, inject, TemplateRef } from '@angular/core';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { ToolHeaderActionClass } from '../tool-header-action.class';

export interface ToolHeaderActionContext {
    hidden: boolean;
}

@Directive({
    selector: '[fdbToolHeaderAction]',
    providers: [
        {
            provide: ToolHeaderActionClass,
            useExisting: ToolHeaderActionDirective
        }
    ],
    standalone: true
})
export class ToolHeaderActionDirective extends ToolHeaderActionClass {
    /**
     * Button component which will be used for the action
     **/
    @ContentChild(ButtonComponent, { descendants: true })
    button: ButtonComponent;

    /** @ignore */
    templateRef = inject<TemplateRef<ToolHeaderActionContext>>(TemplateRef);

    /** @ignore */
    static ngTemplateContextGuard(dir: ToolHeaderActionDirective, ctx: unknown): ctx is ToolHeaderActionContext {
        return !(dir.isSeparator || dir.forceVisibility);
    }
}
