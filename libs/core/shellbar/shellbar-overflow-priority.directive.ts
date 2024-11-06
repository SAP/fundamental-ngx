import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
    selector: '[fdShellbarHidePriority]',
    standalone: true
})
export class ShellbarHidePriorityDirective {
    /** @hidden */
    @Input('fdShellbarHidePriority') priority: any;

    /** @hidden */
    constructor(public el: ElementRef) {}
}
