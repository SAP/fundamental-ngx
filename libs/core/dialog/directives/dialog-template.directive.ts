import { Directive, Input, TemplateRef, inject } from '@angular/core';
import { DialogConfig } from '../utils/dialog-config.class';
import { DialogRef } from '../utils/dialog-ref.class';

export interface DialogTemplateDirectiveContext<T = DialogConfig<any>, U = T extends DialogConfig<infer P> ? P : any> {
    $implicit: DialogRef<U>;
    dialogConfig: T;
}
@Directive({
    selector: '[fdDialogTemplate]',
    standalone: true
})
export class DialogTemplateDirective<T = DialogConfig<any>> {
    /** Custom dialog config model. */
    @Input()
    fdDialogTemplateConfig: T;

    /** @ignore */
    readonly templateRef = inject(TemplateRef<DialogTemplateDirectiveContext<T>>);

    /** @ignore */
    static ngTemplateContextGuard<T extends null>(
        dir: DialogTemplateDirective<T>,
        ctx: DialogTemplateDirectiveContext<DialogConfig<any>>
    ): ctx is DialogTemplateDirectiveContext<DialogConfig<any>>;
    /** @ignore */
    static ngTemplateContextGuard<T = DialogConfig<any>>(
        dir: DialogTemplateDirective<T>,
        ctx: DialogTemplateDirectiveContext<T>
    ): ctx is DialogTemplateDirectiveContext<T>;
    /** @ignore */
    static ngTemplateContextGuard<U extends DialogTemplateDirective<any>>(
        dir: U,
        ctx: DialogTemplateDirectiveContext<any>
    ): ctx is DialogTemplateDirectiveContext<DialogConfig<any>> {
        return true;
    }
}
