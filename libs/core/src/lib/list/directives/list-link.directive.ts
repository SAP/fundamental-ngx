import { Directive, HostBinding, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Subject } from 'rxjs';

@Directive({
    selector: '[fd-list-link], [fdListLink]'
})
export class ListLinkDirective implements OnChanges {
    /** Defines if navigation indicator arrow should be included inside list item */
    @Input()
    @HostBinding('class.fd-list__link--navigation-indicator')
    navigationIndicator = false;

    /** Defines if link should be treated as a navigated */
    @Input()
    @HostBinding('class.is-navigated')
    navigated = false;

    /** @hidden */
    @HostBinding('class.fd-list__link')
    fdListLinkClass = true;

    /** Emits when some of the properties, that should be read by screenreader, are changed */
    readonly _onReadablePropertyChanged$ = new Subject<void>();

    ngOnChanges(changes: SimpleChanges) {
        if (changes.navigationIndicator || changes.navigated) {
            this._onReadablePropertyChanged$.next();
        }
    }
}
