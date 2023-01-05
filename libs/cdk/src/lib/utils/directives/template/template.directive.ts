import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
    selector: '[fdkTemplate], [fdTemplate]',
    standalone: true
})
export class TemplateDirective {
    /** Name of the template */
    @Input('fdkTemplate')
    name: string;

    /** @hidden */
    constructor(public templateRef: TemplateRef<any>) {}

    /** @hidden */
    getName(): string {
        return this.name;
    }
}
