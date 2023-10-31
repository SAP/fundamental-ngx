import { Directive, Input, TemplateRef, inject } from '@angular/core';
import { DialogConfig } from '../utils/dialog-config.class';
import { DialogRef } from '../utils/dialog-ref.class';

export interface DialogTemplateDirectiveContext<T = DialogConfig<any>, U = T extends DialogConfig<infer P> ? P : any> {
    $implicit: DialogRef<U>;
    dialogConfig: T;
}

export type DialogConfigType<T, M> = DialogConfigInterface<T, M>;

export type DialogConfigInterface<A, M> = DialogConfig & A extends DialogConfig ? never : DialogConfig<M>;
@Directive({
    selector: '[fdDialogTemplate]',
    exportAs: 'fdDialogTemplate',
    standalone: true
})
export class DialogTemplateDirective<T = DialogConfig<any>> {
    /** @hidden */
    // static ngAcceptInputType_fdDialogTemplateConfig: never | DialogConfig;
    /** Custom dialog config model. */
    @Input()
    fdDialogTemplateConfig: T;

    /** @hidden */
    readonly templateRef = inject(TemplateRef<DialogTemplateDirectiveContext<T>>);

    /** @hidden */
    static ngTemplateContextGuard<T extends null>(
        dir: DialogTemplateDirective<T>,
        ctx: DialogTemplateDirectiveContext<DialogConfig<any>>
    ): ctx is DialogTemplateDirectiveContext<DialogConfig<any>>;
    /** @hidden */
    static ngTemplateContextGuard<T = DialogConfig<any>>(
        dir: DialogTemplateDirective<T>,
        ctx: DialogTemplateDirectiveContext<T>
    ): ctx is DialogTemplateDirectiveContext<T>;
    /** @hidden */
    static ngTemplateContextGuard<U extends DialogTemplateDirective<any>>(
        dir: U,
        ctx: DialogTemplateDirectiveContext<any>
    ): ctx is DialogTemplateDirectiveContext<DialogConfig<any>> {
        return true;
    }
}
