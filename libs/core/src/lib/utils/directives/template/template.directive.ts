import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
    selector: '[fdTemplate]'
})
export class TemplateDirective {

    @Input('fdTemplate') name: string;

    constructor(public templateRef: TemplateRef<any>) { }

    getName(): string {
        return this.name;
    }
}
