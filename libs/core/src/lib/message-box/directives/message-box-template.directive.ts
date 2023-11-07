import { Directive, Input, TemplateRef, inject } from '@angular/core';
import { MessageBoxConfig } from '../utils/message-box-config.class';
import { MessageBoxRef } from '../utils/message-box-ref.class';

export interface MessageBoxTemplateDirectiveContext<
    T = MessageBoxConfig<any>,
    U = T extends MessageBoxConfig<infer P> ? P : any
> {
    $implicit: MessageBoxRef<U>;
    messageBoxConfig: T;
}
@Directive({
    selector: '[fdMessageBoxTemplate]',
    standalone: true
})
export class MessageBoxTemplateDirective<T = MessageBoxConfig<any>> {
    /** Custom dialog config model. */
    @Input()
    fdMessageBoxTemplateConfig: T;

    /** @hidden */
    readonly templateRef = inject(TemplateRef<MessageBoxTemplateDirectiveContext<T>>);

    /** @hidden */
    static ngTemplateContextGuard<T extends null>(
        dir: MessageBoxTemplateDirective<T>,
        ctx: MessageBoxTemplateDirectiveContext<MessageBoxConfig<any>>
    ): ctx is MessageBoxTemplateDirectiveContext<MessageBoxConfig<any>>;
    /** @hidden */
    static ngTemplateContextGuard<T = MessageBoxConfig<any>>(
        dir: MessageBoxTemplateDirective<T>,
        ctx: MessageBoxTemplateDirectiveContext<T>
    ): ctx is MessageBoxTemplateDirectiveContext<T>;
    /** @hidden */
    static ngTemplateContextGuard<U extends MessageBoxTemplateDirective<any>>(
        dir: U,
        ctx: MessageBoxTemplateDirectiveContext<any>
    ): ctx is MessageBoxTemplateDirectiveContext<MessageBoxConfig<any>> {
        return true;
    }
}
