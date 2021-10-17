import { Directive, HostBinding } from '@angular/core';

@Directive({
    selector: '[fdListFooter], [fd-list-footer]'
})
export class ListFooterDirective {
    /** @hidden */
    @HostBinding('class.fd-list__footer')
    fdListFooterClass = true;
}
