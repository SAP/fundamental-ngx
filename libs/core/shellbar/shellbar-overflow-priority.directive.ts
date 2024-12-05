import { Directive, ElementRef, inject, Input } from '@angular/core';

@Directive({
    selector: '[fdShellbarHidePriority]',
    standalone: true
})
export class ShellbarHidePriorityDirective {
    /** @hidden */
    @Input('fdShellbarHidePriority') priority: any;

    /** @hidden */
    el = inject(ElementRef);
}
