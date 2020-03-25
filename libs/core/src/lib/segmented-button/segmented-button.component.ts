import { ChangeDetectionStrategy, Component, HostBinding, ViewEncapsulation } from '@angular/core';

/**
 * Container for grouped buttons.
 *
 * ```html
 * <fd-segmented-button>
 *     <button fd-button>Button</button>
 * </fd-segmented-button>
 * ```
 */
@Component({
    selector: 'fd-segmented-button',
    templateUrl: './segmented-button.component.html',
    styleUrls: ['./segmented-button.component.scss'],
    host: {
        'role': 'group'
    },
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SegmentedButtonComponent {

    /** @hidden */
    @HostBinding('class.fd-segmented-button')
    fdSegmentedButtonClass: boolean = true;
}
