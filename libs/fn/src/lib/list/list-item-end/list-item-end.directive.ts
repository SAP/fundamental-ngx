import { Directive, TemplateRef } from '@angular/core';

@Directive({
    selector: '[fnListItemEnd]'
})
export class ListItemEndDirective {
    constructor(readonly templateRef: TemplateRef<any>) {}
}
