import { Directive, ElementRef } from '@angular/core';
import {
    DeprecatedSelector,
    FD_DEPRECATED_DIRECTIVE_SELECTOR,
    getDeprecatedModel
} from '../../deprecated-selector.class';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fdOverflowListItem], [fd-overflow-list-item]',
    standalone: true,
    providers: [
        {
            provide: FD_DEPRECATED_DIRECTIVE_SELECTOR,
            useValue: getDeprecatedModel('[fdkOverflowListItem]', '[fdOverflowListItem], [fd-overflow-list-item]')
        }
    ]
})
export class DeprecatedOverflowListItemDirective extends DeprecatedSelector {}

@Directive({
    selector: '[fdkOverflowListItem], [fdOverflowListItem], [fd-overflow-list-item]',
    standalone: true
})
export class OverflowListItemDirective {
    /** @hidden */
    constructor(public el: ElementRef) {}
}
