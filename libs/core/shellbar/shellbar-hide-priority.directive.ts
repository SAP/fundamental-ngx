import { Directive, ElementRef, inject, Input } from '@angular/core';

@Directive({
    selector: '[fdShellbarHidePriority]',
    standalone: true,
    host: {
        '[style.flex-shrink]': '0'
    }
})
export class ShellbarHidePriorityDirective {
    /** @hidden */
    @Input('fdShellbarHidePriority') priority: any;

    /** @hidden */
    elRef = inject(ElementRef);
}
