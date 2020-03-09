import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';

/**
 * Applies fundamental layout and styling to the contents of a dialog header.
 *
 * ```html
 * <fd-dialog-header>
 *     <h1 fd-dialog-title>Title</h1>
 *     <button fd-dialog-close-btn></button>
 * </fd-dialog-header>
 * ```
 */
@Component({
    selector: 'fd-dialog-header',
    templateUrl: './dialog-header.component.html',
    styles: [':host {display: block;}'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogHeaderComponent {

    /** @hidden */
    @HostBinding('class.fd-modal__header')
    modalHeader = true;
}
