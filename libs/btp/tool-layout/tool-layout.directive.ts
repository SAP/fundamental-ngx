import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
    selector: '[fdbToolLayout]',
    host: {
        class: 'fd-tool-layout'
    },
    standalone: true,
})
export class ToolLayoutDirective {
    /**
     * whether the Tool Layout is in Tablet mode
     */
    @HostBinding('class.fd-tool-layout--tablet')
    @Input()
    tablet = true;

   /**
     * whether the Tool Layout is in Mobile mode
     */
    @HostBinding('class.fd-tool-layout--phone')
    @Input()
    phone = true;
}
