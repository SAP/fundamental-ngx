import { Directive, HostBinding } from '@angular/core';

@Directive({
    selector: '[fd-list-info-label], [fdListInfoLabel]',
    standalone: true
})
export class ListInfoLabelDirective {
    /** @hidden */
    @HostBinding('class.fd-list__info-label')
    fdListInfoLabel = true;
}
