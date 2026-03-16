import { Directive, TemplateRef, inject, input } from '@angular/core';

@Directive({
    selector: '[fdkTemplate]'
})
export class TemplateDirective {
    /** Name of the template */
    readonly name = input('', { alias: 'fdkTemplate' });

    /** @hidden */
    readonly templateRef = inject<TemplateRef<any>>(TemplateRef);

    /** @hidden */
    getName(): string {
        return this.name();
    }
}
