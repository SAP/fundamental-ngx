import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';

/**
 * Avatar group overflow body component, used to provide a template for the avatar group overflow body.
 */
@Component({
    selector: 'fd-avatar-group-overflow-body',
    templateUrl: './avatar-group-overflow-body.component.html',
    host: {
        class: 'fd-popover__wrapper'
    },
    styleUrls: ['./avatar-group-overflow-body.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true
})
export class AvatarGroupOverflowBodyComponent {
    /** Remove the padding from the overflow body. */
    @Input()
    noPadding = false;

    /** Hide horizontal scrollbar from the overflow body. */
    @Input()
    noHorizontalScroll = true;

    /** Hide vertical scrollbar from the overflow body. */
    @Input()
    noVerticalScroll = true;

    /** Additional popover body class */
    @Input()
    additionalPopoverBodyClass = '';
}
