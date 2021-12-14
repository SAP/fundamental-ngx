import { Directive, Input } from '@angular/core';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fd-avatar-group-overflow-body]',
    host: {
        '[class.fd-avatar-group__overflow-body]': 'true',
        '[class.fd-avatar-group__overflow-body--no-padding]': 'noPadding',
        '[class.fd-avatar-group__overflow-body--no-horizontal-scroll]': 'noHorizontalScroll',
        '[class.fd-avatar-group__overflow-body--no-vertical-scroll]': 'noVerticalScroll'
    }
})
export class AvatarGroupOverflowBodyDirective {
    /** Remove the padding from the overflow body. */
    @Input()
    noPadding = false;

    /** Hide horizontal scrollbar from the overflow body. */
    @Input()
    noHorizontalScroll = true;

    /** Hide vertical scrollbar from the overflow body. */
    @Input()
    noVerticalScroll = true;
}
