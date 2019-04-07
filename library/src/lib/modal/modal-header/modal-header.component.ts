import { Component, HostBinding } from '@angular/core';

/**
 * Applies fundamental layout and styling to the contents of a modal header.
 *
 * ```html
 * <fd-modal-header>
 *     <h1 fd-modal-title>Title</h1>
 *     <button fd-modal-close-btn></button>
 * </fd-modal-header>
 * ```
 */
@Component({
    selector: 'fd-modal-header',
    templateUrl: './modal-header.component.html',
    styles: [':host {display: block;}']
})
export class ModalHeaderComponent {

    /** @hidden */
    @HostBinding('class.fd-modal__header')
    modalHeader = true;
}
