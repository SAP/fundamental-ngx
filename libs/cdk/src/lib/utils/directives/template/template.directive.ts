import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
    selector: '[fdTemplate]'
})
export class TemplateDirective {
    /** Name of the template */
    @Input('fdTemplate')
    name: string;

    /** @hidden */
    constructor(public templateRef: TemplateRef<any>) {}

    /** @hidden */
    getName(): string {
        return this.name;
    }
}
