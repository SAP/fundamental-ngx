import { Directive, HostBinding } from '@angular/core';

@Directive({
    selector: '[fdListThumbnail], [fd-list-thumbnail]',
    standalone: true
})
export class ListThumbnailDirective {
    /** @ignore */
    @HostBinding('class.fd-list__thumbnail')
    fdListThumbnailClass = true;
}
